"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateGameFormSchema } from "./schema";
import * as z from "zod";

export async function createGame(data: z.infer<typeof CreateGameFormSchema>) {
  const result = CreateGameFormSchema.safeParse(data);
  //   name: formData.get("game_name") as string,
  //   bggid: formData.get("bgg_id") as string,
  // };

  // if (result.error) {
  //   return { success: false, error: result.error.format() }
  // }

  // if (result.success) {
  //   return { success: true, data: result.data }
  // }

  try {
    await sql`
      INSERT INTO games (name, bggId)
      VALUES (${data.gamename}, ${data.bggid})`;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to create game.",
    };
  }

  revalidatePath("/admin/games");
  redirect("/admin/games");
}
