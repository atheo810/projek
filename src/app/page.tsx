import Link from "next/link";

export default function Page() {
  return (
    <main className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Muhammad Patriot Bayu Santosa</h1>
      <p className="text-muted-foreground mb-6">
        Belajar Full-Stack Development, satu commit setiap hari.
      </p>
      <Link href="/blog" className="underline">
        Lihat catatan belajar →
      </Link>
    </main>
  );
}
