export default function Loading() {
  return (
    <div className="w-full">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="mb-4 h-6 w-full max-w-screen-sm animate-pulse rounded-full bg-muted mx-auto"
        />
      ))}
    </div>
  );
}
