import { z } from "zod";

export const postFrontmatterSchema = z.object({
  date: z.string(),
  subtitle: z.string(),
  title: z.string(),
});