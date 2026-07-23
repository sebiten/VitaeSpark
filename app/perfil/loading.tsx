export default function PerfilLoading() {
  return (
    <main className="min-h-screen bg-[#0F0F12] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-28 animate-pulse rounded-3xl border border-white/8 bg-white/[0.035]" />
        <div className="h-36 animate-pulse rounded-3xl border border-white/8 bg-white/[0.03]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-72 animate-pulse rounded-3xl border border-white/8 bg-white/[0.03]" />
          <div className="h-72 animate-pulse rounded-3xl border border-white/8 bg-white/[0.03]" />
          <div className="h-72 animate-pulse rounded-3xl border border-white/8 bg-white/[0.03]" />
        </div>
      </div>
    </main>
  );
}
