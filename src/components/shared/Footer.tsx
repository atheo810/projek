import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <div className="container py-8 flex flex-col gap-4">
        <Separator />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Muhammad Patriot Bayu Santosa</p>
          <div className="flex gap-4">
            <a href="https://github.com/atheo810" target="_blank">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/patriotsantosa" target="_blank">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
