import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default async function FileUpload() {
  return (
    <form className="flex w-full max-w-sm gap-2 mt-8">
      <Input id="picture" type="file" />
      <Button><ArrowUpTrayIcon className="mr-2 h-4 w-4" /> Upload</Button>
    </form>
  )
}
