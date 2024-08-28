import { z } from 'zod';

export const longUrlSchema = z.object({
  body: z.object({ longUrl: z.string().url() })
});

export const shortCodeSchema = z.object({
  params: z.object({ shortCode: z.string().length(7) })
});
