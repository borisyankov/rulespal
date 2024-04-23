export default function Loading() {
  return (
    <div className="mt-10 w-full">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="mx-auto mb-4 h-4 w-full max-w-screen-sm animate-pulse rounded-full bg-muted"
        />
      ))}
    </div>
  );
}
