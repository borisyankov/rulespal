
export default async function Title({ children }: {  children: React.ReactNode }) {
  return (
      <h1 className="text-3xl mb-8">{children}</h1>
  );
}
