import Themer from "./themer";

export default async function Title({ children }: {  children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
    <h1 className="text-3xl mb-8">{children}</h1>
    <Themer />
    </div>
  );
}
