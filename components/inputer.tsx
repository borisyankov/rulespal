import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useEnterSubmit } from "./use-enter-submit";

type Props = {
  submitMessage: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Inputer({ submitMessage, onChange }: Props) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) {
      return;
    }
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      setValue('');
    }
    submitMessage(event);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };
  const height = value.split("\n").length * 24 + 12;
  return (
    <div className="">
      <form
        ref={formRef}
        className="stretch flex flex-row gap-3 mt-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        onSubmit={handleFormSubmit}
      >
        <textarea
          id="prompt-textarea"
          className="resize-none rounded-3xl focus:ring-2 focus:ring-amber-300 focus:outline-none flex-1 text-sm leading-6 text-slate-900 placeholder:slate-400 px-4 py-1.5 ring-inset dark:bg-gray-700 dark:text-slate-200" 
          ref={textAreaRef}
          style={{ height }}
          value={value}
          placeholder="Ask about rules..."
          spellCheck="false"
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="-ml-12 resize-none rounded-full p-2 text-white hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:opacity-25 disabled:bg-transparent"
          disabled={value.length === 0}
        >
          <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
