export default function Footer() {
  return (
    <footer className="w-full m-auto mt-8 p-2 max-w-screen-md text-foreground/50">
      © {new Date().getFullYear()}{' '}
      <a href="https://x.com/borisyankov">Boris Yankov</a>
    </footer>
  );
}
