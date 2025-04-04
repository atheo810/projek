"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser-client";
import { Button } from "@/components/ui/button";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm("Yakin hapus post ini?")) return;
    await supabase.from("posts").delete().eq("id", postId);
    router.refresh();
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Hapus
    </Button>
  );
}
