export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8">
      <div className="h-8 w-48 bg-warm-200 animate-pulse mb-8" />
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="hidden lg:block space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 bg-warm-200 animate-pulse" />
          ))}
        </div>
        <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white sketchy-border-light overflow-hidden">
              <div className="aspect-square bg-warm-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-warm-200 animate-pulse" />
                <div className="h-4 w-2/3 bg-warm-200 animate-pulse" />
                <div className="h-6 w-1/3 bg-warm-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
