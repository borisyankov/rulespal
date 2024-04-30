import Header from './ui/header';
import GameBar from './ui/gamebar';
import Footer from './ui/footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-screen-sm">
        <GameBar />
      </div>
      <Footer />
    </>
  );
}
