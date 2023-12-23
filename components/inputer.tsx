import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type Props = {
  submitMessage: (
    event?: React.FormEvent<HTMLFormElement>,
    requestOptions?: {
      data?: Record<string, string>;
    }
  ) => Promise<void>;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export default function Inputer({ submitMessage, onChange }: Props) {
  return (
    <div className="">
      <form
        className="stretch mx-2 flex flex-row gap-3 my-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        onSubmit={submitMessage}
      >
        <textarea
          id="prompt-textarea"
          className="resize-none block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          // className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
          placeholder="Ask a rules question..."
          spellCheck="false"
          onChange={onChange}
        />
        <button
          type="submit"
          className="rounded-full p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
