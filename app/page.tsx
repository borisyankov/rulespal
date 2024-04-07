import Header from "./ui/header";
import GameBar from "./ui/gamebar";

export default function Home() {
  return (
    <div className="min-h-screen max-w-3xl m-auto">
      <Header>RulesPal</Header>
      <GameBar />
    </div>
  );
}