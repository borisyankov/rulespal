type Props = {
  children: React.ReactNode;
  onClick?: () => void;
}
export default function RoundButton({ children, onClick }: Props) {
  return (
    <button
      className="size-10 rounded-full disabled:opacity-50 transition hover:bg-primary/25 flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
