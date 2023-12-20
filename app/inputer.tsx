import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Inputer() {
  return (
    <div className="mt-2 flex flex-row">
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="What is the hand-size limit?"
      />
      <button
        type="button"
        className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
