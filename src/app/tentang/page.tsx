export default function Page() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Tentang</h1>
      <p className="text-muted-foreground mb-6">
        Aku bikin website ini sebagai journaling blog yang aku tulis secara
        pribadi untuk tujuan sharing knowledge kepada orang-orang sekitar.
      </p>
      <div className="flex gap-2 flex-wrap">
        <ul className="flex gap-2">
          {["Next.js", "TypeScript", "Supabase", "Tailwind", "shadcn/ui"].map(
            (tech) => (
              <li key={tech} className="text-xs border rounded-full px-3 py-1">
                {tech}
              </li>
            ),
          )}
        </ul>
      </div>
    </main>
  );
}
