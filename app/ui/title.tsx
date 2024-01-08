
export default async function Title({ children }: {  children: React.ReactNode }) {
  return (
      <h1 className="text-5xl mb-4">{children}</h1>
  );
}
