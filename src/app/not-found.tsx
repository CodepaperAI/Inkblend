import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-4 pt-24">
      <div className="max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-red">
          404
        </p>
        <h1 className="mt-5 font-display text-6xl leading-none text-white">
          This wall is blank.
        </h1>
        <p className="mt-5 text-lg leading-8 text-white/62">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back Home
        </Link>
      </div>
    </section>
  );
}
