import Header from './ui/header';
import GameBar from './ui/gamebar';
import Footer from './ui/footer';
import ThemeSwitcher from './ui/theme-switcher';

export default function Home() {
  return (
    <div className="m-auto min-h-screen max-w-screen-sm">
      <Header>
        <img className="h-12" src="/rulespal.svg" alt="RulesPal" />
        <ThemeSwitcher />
      </Header>
      <GameBar />
      <Footer />
    </div>
  );
}
