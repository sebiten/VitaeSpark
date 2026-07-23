export default function AdminCvsLoading() {
  return (
    <main className="min-h-screen bg-[#0C0C10] px-4 py-8 text-[#F6F2EA] sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px] animate-pulse">
        <div className="h-5 w-32 rounded bg-white/6" />
        <div className="mt-8 border-b border-white/8 pb-7">
          <div className="h-3 w-40 rounded bg-white/6" />
          <div className="mt-4 h-10 w-full max-w-xl rounded bg-white/8" />
          <div className="mt-3 h-4 w-full max-w-2xl rounded bg-white/5" />
        </div>
        <div className="mt-6 grid gap-3 border-b border-white/8 pb-6 md:grid-cols-[minmax(260px,1fr)_220px_190px_auto]">
          <div className="h-11 rounded-xl bg-white/6" />
          <div className="h-11 rounded-xl bg-white/6" />
          <div className="h-11 rounded-xl bg-white/6" />
          <div className="h-11 rounded-xl bg-white/8" />
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[.78] rounded-2xl border border-white/7 bg-white/[0.025]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
