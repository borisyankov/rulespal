"use client"
 
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { createGame } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import Title from "@/app/ui/title";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@/app/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";

export default function CreateGame() { // async
  const formSchema = z.object({
    gamename: z.string().min(2).max(50),
    bggid: z.number(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gamename: "",
      bggid: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // createGame(values)
    console.log(values)
  }

  return (
    <>
      <Title>Create Game</Title>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-full min-w-96 mx-auto space-y-8">
          <FormField
            control={form.control}
            name="gamename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gamename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BGG Id</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your BGGGGGG.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"><PlusCircleIcon className="mr-2 h-4 w-4" />Create</Button>
        </form>
      </Form>
    </>
  );
}
