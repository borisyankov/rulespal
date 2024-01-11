type Props = {
  children?: React.ReactNode;
  text: string;
};

export default async function Title({ children, text }: Props) {
  return (
    <div className="flex flex-1 w-full justify-between mb-8">
      <h1 className="text-3xl">{text}</h1>
      {children}
    </div>
  );
}
