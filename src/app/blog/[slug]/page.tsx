import { supabase } from "@/lib/supabase/client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) return <p>Post tidak ditemukan.</p>;

  return (
    <main className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div>{post.content}</div>
    </main>
  );
}
