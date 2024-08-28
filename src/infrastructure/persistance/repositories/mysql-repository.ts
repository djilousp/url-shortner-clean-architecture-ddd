import type { UrlRepository } from '../../../domain/repositories/url-repository';
import { ShortUrl } from '../../../domain/entities/shorturl';
import db from '../db/mysql-db';
import { randomUUID } from 'crypto';

export class MysqlUrlRepository implements UrlRepository {
  async saveUrl(url: ShortUrl): Promise<void> {
    // prepare and execute sql raw query to prevent SQL injections
    await db.execute(
      `INSERT INTO urls (id, short_code, original_url) VALUES (UUID_TO_BIN(?), ?, ?)`,
      [url.getId(), url.getShortCode(), url.getOriginalUrl()]
    );
  }

  async shortCodeExists(shortCode: string): Promise<boolean> {
    const [rows] = await db.execute(`SELECT COUNT(*) as count from urls WHERE short_code = ?`, [
      shortCode
    ]);

    return !!rows[0].count;
  }
  async urlFromShortCode(shortCode: string): Promise<ShortUrl | null> {
    const [rows] = await db.execute(
      `SELECT 
        BIN_TO_UUID(u.id) AS id,
        short_code AS shortCode,
        original_url AS originalUrl,
        CASE
            WHEN COUNT(uc.id) > 0 THEN
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', BIN_TO_UUID(uc.id),
                        'accessedAt', uc.accessed_at
                    )
                )
            ELSE
                '[]'
        END AS shortUrlClicks
      FROM
        urls u
      LEFT JOIN
        url_clicks uc ON u.id = uc.short_url_id
      WHERE
        short_code = ? 
      GROUP BY
        u.id;

      `,
      [shortCode]
    );
    if (rows[0]) {
      const shortUrlData = {
        ...rows[0],
        shortUrlClicks: JSON.parse(rows[0].shortUrlClicks)
      };

      return ShortUrl.from(
        shortUrlData.id,
        shortUrlData.shortCode,
        shortUrlData.originalUrl,
        shortUrlData.shortUrlClicks
      );
    }
    return null;
  }
  async incrementClicksFor(shortUrlId: string): Promise<void> {
    await db.execute(
      `INSERT INTO url_clicks (id, short_url_id, accessed_at) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?), ?);`,
      [randomUUID(), shortUrlId, new Date()]
    );
  }
  async clicksCountByShortCode(shortCode: string): Promise<number> {
    const [rows] = await db.execute(
      `SELECT COUNT(urls.id) as count from urls 
        LEFT JOIN urls_clicks uc ON urls.id = uc.short_url_id 
        WHERE short_code = ?;
      `,
      [shortCode]
    );

    return rows[0].count;
  }
}
