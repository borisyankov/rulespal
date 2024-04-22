import Header from "./ui/header";
import GameBar from "./ui/gamebar";
import Footer from "./ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen-sm m-auto">
      <Header><img className="h-12" src="/rulespal.svg" alt="RulesPal" /></Header>
      <GameBar />
      <Footer />
    </div>
  );
}