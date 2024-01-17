import { FormEvent } from "react";
import {XMLParser, XMLBuilder, XMLValidator}  from "fast-xml-parser";
import { pdfToEmbeddings, createEmbeddings, dododo } from '@/app/lib/actions';
import Title from "@/app/ui/title";
import { Button } from "@/app/ui/button";

async function getGameInfo(gameId: number) {
  try {
    const response = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`
    );
    const data = await response.text();
    try {
      const parser = new XMLParser();
      const result = parser.parse(data);
      console.log(JSON.stringify(result.items.item, null, 2));
    } catch (err) {
      console.error("Error parsing XML:", err);
    }
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

export default function CreateGame() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    "use server";
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    console.log(formData);

    // const vectors = await pdfToEmbeddings('..\\..\\DUNE_IMPERIUM_UPRISING_RULEBOOK.pdf');
    // createEmbeddings(397598, 'Rulebook', vectors);

    // await getGameInfo(397598);

    // Handle response if necessary
    // const data = await response.json()
    // ...
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Title text="Create assistant" />
      <form onSubmit={onSubmit}>
        <div className="pb-5">
          <label
            htmlFor="bggId"
            className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
          >
            Game BGG Id
          </label>
          <div className="mt-2">
            <input
              // type="number"
              name="bggId"
              id="bggId"
              className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              placeholder="Jane Smith"
            />
          </div>
        </div>
        <Button
          type="submit">
          Create
        </Button>
      </form>
    </main>
  );
}
