import Header from './ui/header';
import GameBar from './ui/gamebar';
import Footer from './ui/footer';
import ThemeSwitcher from './ui/theme-switcher';
import Logo from './ui/logo';

export default function Home() {
  return (
    <div className="m-auto min-h-screen max-w-screen-sm">
      <Header>
        <Logo className="w-40" />
        <ThemeSwitcher />
      </Header>
      <GameBar />
      <Footer />
    </div>
  );
}
