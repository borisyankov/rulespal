import Inputer from "./inputer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl">Dune Imperium</h1>
      <h2>Ask any rules question. Get answers directly from the rule book.</h2>

      <Inputer />
    </main>
  );
}
