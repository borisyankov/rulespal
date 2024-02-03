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
  const height = value.split("\n").length * 24 + 12;
  return (
    <form
      ref={formRef}
      className="stretch p-4 flex flex-row gap-3 mx-auto w-full max-w-screen-md"
      onSubmit={handleFormSubmit}
    >
      <textarea
        id="prompt-textarea"
        className="resize-none rounded-3xl focus:ring-2 focus:ring-primary focus:outline-none flex-1 text-sm leading-6 text-slate-900 placeholder:slate-400 px-4 py-1.5 ring-inset bg-gray-200 dark:bg-gray-800 dark:text-slate-200" 
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
        className="-ml-11 m-1 resize-none rounded-full flex justify-center items-center size-7 text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-25 disabled:bg-transparent"
        disabled={!isLoading && value.length === 0}
      > 
        <ButtonIcon className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
}