"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/app/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Form } from "@/app/ui/form";
import MyFormField from "@/app/ui/form-field";
import { CreateGameFormSchema } from "./schema";
import { createGame } from "./actions";

export default function CreateGameForm() {
  const form = useForm<z.infer<typeof CreateGameFormSchema>>({
    resolver: zodResolver(CreateGameFormSchema),
    defaultValues: {
      gamename: "",
      bggid: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof CreateGameFormSchema>) {
    const result = await createGame(data);

    if (!result) {
      console.log('Something went wrong')
      return
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto min-w-96 max-w-full space-y-8"
      >
        <MyFormField
          label="Game name"
          name="gamename"
          description="Full display name of the game."
          form={form as unknown as UseFormReturn}
        />
        <MyFormField
          label="BGG Id"
          name="bggid"
          description="The game ID used in BoardGameGeek."
          form={form as unknown as UseFormReturn}
        />
        <Button type="submit">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </form>
    </Form>
  );
}
