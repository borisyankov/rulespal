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
    <form className="mt-2 flex flex-row" onSubmit={submitMessage}>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="What is the hand-size limit?"
        onChange={onChange}
      />
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}
