"use client"

import { SendHorizontalIcon, StopCircleIcon } from "lucide-react"
import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useEnterSubmit } from "./use-enter-submit";

type Props = {
  isLoading: boolean;
  stop: () => void;
  submitMessage: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

export default function QuestionInput({ isLoading, stop, submitMessage, onChange }: Props) {
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

    if (isLoading) {
      stop();
      return;
    }

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
  const ButtonIcon = isLoading ? StopCircleIcon : SendHorizontalIcon;
  const height = value.split("\n").length * 24 + 28;
  return (
    <form
      ref={formRef}
      className="stretch p-4 flex flex-row gap-3 mx-auto w-full max-w-screen-md"
      onSubmit={handleFormSubmit}
    >
      <textarea
        id="prompt-textarea"
        className="resize-none rounded-3xl focus:ring-2 focus:ring-primary focus:outline-none flex-1
        leading-6 text-zinc-900 placeholder:zinc-400 px-6 py-3 ring-inset bg-gray-200 dark:bg-gray-800 dark:text-zinc-200" 
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
        className="mt-[4px] ml-[-60px] resize-none rounded-full flex justify-center items-center size-11 
        text-black
        dark:text-white
        enabled:hover:text-white
        enabled:hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-25"
        disabled={!isLoading && value.length === 0}
      > 
        <ButtonIcon className="size-5 dark:text-black" aria-hidden="true" />
      </button>
    </form>
  );
}