import Header from './ui/header';
import GameBar from './ui/gamebar';
import Footer from './ui/footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-screen-md">
        <GameBar />
      </div>
      <Footer />
    </>
  );
}
