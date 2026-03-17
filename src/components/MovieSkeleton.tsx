export default function MovieSkeleton() {
  return (
    <div className="animate-pulse bg-zinc-900 rounded-xl overflow-hidden">
      <div className="w-full h-[320px] bg-zinc-800" />

      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );
}
