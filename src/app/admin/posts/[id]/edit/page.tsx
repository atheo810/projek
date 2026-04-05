"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser-client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const supabase = createClient();

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({ title, slug, content })
      .eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
  };

  if (loading) return <p className="container mx-auto py-16">Loading...</p>;

  return (
    <main className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit">Simpan Perubahan</Button>
      </form>
    </main>
  );
}
