import * as z from "zod";

export const CreateGameFormSchema = z.object({
  gamename: z.string().min(2).max(50),
  bggid: z.coerce.number(),
});
