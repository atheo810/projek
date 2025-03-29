import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="flex flex-col gap-4">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border rounded-lg p-4 hover:bg-muted"
          >
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
