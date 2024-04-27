"use client"

import { SendHorizontalIcon, StopCircleIcon } from "lucide-react";
import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useEnterSubmit } from "@/app/lib/use-enter-submit";
import Textarea from 'react-textarea-autosize';

type Props = {
  isLoading: boolean;
  stop: () => void;
  submitMessage: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserInput({ isLoading, stop, submitMessage, onChange }: Props) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      stop();
      return;
    }
    if (!value.trim()) {
      return;
    }
    if (textAreaRef.current) {
      if (window.innerWidth < 600) {
        textAreaRef.current.blur();
      } else {
        textAreaRef.current.focus();
      }
    }
    setValue('');
    submitMessage(event);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };
  const ButtonIcon = isLoading ? StopCircleIcon : SendHorizontalIcon;
  return (
    <form
      ref={formRef}
      className="fixed bottom-0 inset-x-0 p-4 flex flex-row gap-3 mx-auto w-full max-w-screen-sm"
      onSubmit={handleFormSubmit}
    >
      <Textarea
        id="prompt-textarea"
        className="resize-none rounded-3xl focus:ring-2 focus:ring-primary focus:outline-none flex-1 h-12
        leading-6 text-zinc-900 placeholder:zinc-400 px-6 py-3 ring-inset bg-gray-200 dark:bg-gray-800 dark:text-zinc-200" 
        ref={textAreaRef}
        value={value}
        maxRows={5}
        placeholder="Ask about rules..."
        spellCheck="false"
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <button
        type="submit"
        className="mb-[4px] ml-[-56px] resize-none rounded-full flex justify-center items-center size-10 self-end
        text-zinc-700 dark:text-zinc-300 enabled:hover:text-white bg-transparent transition
        enabled:hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-25"
        disabled={!isLoading && value.length === 0}
      > 
        <ButtonIcon className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
}