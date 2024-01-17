'use client';

import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { parseRulebook } from "@/app/lib/files";

export default function FileUpload() {
  function handleUpload() {
    // e.preventDefault(); 
    parseRulebook();
    return;
    // const file = e.target.files[0];
    // if (!file) {
    //   return;
    // }
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const contents = e.target.result;
    //   console.log(contents);
    // };
    // reader.readAsText(file);
  }
  return (
    <form className="flex w-full max-w-sm gap-2 mt-8">
      <Input id="picture" type="file" />
      <Button onClick={(e) => { handleUpload(); }}>
        <ArrowUpTrayIcon className="mr-2 size-4" /> Upload
      </Button>
    </form>
  )
}
