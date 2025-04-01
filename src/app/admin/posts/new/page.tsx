"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser-client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .insert({ title, slug, content });
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/blog");
  };

  return (
    <main className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Tambah Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          placeholder="Judul"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
        <Input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <Textarea
          placeholder="Isi konten"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit">Publish</Button>
      </form>
    </main>
  );
}
