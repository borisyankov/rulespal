import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Props = {
  submitMessage: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Inputer({ submitMessage, onChange }: Props) {
  const [value, setValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textAreaRef.current) {
      textAreaRef.current.value = '';
      textAreaRef.current.focus();
      setValue('');
    }
    submitMessage(event);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey || isComposing) {
      // event.preventDefault();
    }
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
          className="resize-none w-full rounded-3xl border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset bg-gray-700 ring-amber-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6 outline-amber-300"
          ref={textAreaRef}
          style={{ height }}
          placeholder="Ask a rules question..."
          spellCheck="false"
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="-ml-12 rounded-full p-2 text-white hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:opacity-25 disabled:bg-opacity-0"
          disabled={value.length === 0}
        >
          <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
