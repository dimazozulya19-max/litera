export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8 sm:px-10">
      <section className="flex flex-1 flex-col justify-center py-24">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-black/45">
          Your stories. Your library. Your journey.
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
          Одне місце для всіх ваших історій.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
          Каркас Litera готовий. Функції додаватимемо поступово.
        </p>
      </section>
    </main>
  );
}
