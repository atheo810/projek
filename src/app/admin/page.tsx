import { createClient } from "@/lib/supabase/server-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/logout-button";
import { DeletePostButton } from "@/components/shared/delete-post-button";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="container mx-auto py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <LogoutButton />
      </div>

      <Link href="/admin/posts/new">
        <Button className="mb-6">+ Tambah Post</Button>
      </Link>

      <div className="flex flex-col gap-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/posts/${post.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
