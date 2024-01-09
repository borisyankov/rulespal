import { Button } from "@/app/ui/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default async function FileUpload() {
  return (
    <form>
      <Button color="amber" type="submit"><ArrowUpTrayIcon /> Upload File</Button>
    </form>
  );
}
