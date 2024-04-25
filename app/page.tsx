import Header from './ui/header';
import GameBar from './ui/gamebar';
import Footer from './ui/footer';
import ThemeSwitcher from './ui/theme-switcher';
import Logo from './ui/logo';

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header>
        <Logo className="w-40" />
        <ThemeSwitcher />
      </Header>
      <div className="m-auto w-full max-w-screen-sm">
        <GameBar />
      </div>
      <Footer />
    </div>
  );
}
