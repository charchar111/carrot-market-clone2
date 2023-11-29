import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <div className="px-3 py-10">
      <form className="flex flex-col space-y-4 ">
        <input
          type="text"
          className="rounded-md border-gray-400"
          placeholder="Write a title"
        />
        <textarea
          rows={6}
          placeholder="Ask a question!"
          className="resize-none rounded-md border-gray-400"
        />
        <button className="rounded-lg bg-orange-400 py-2 font-semibold text-white transition-all hover:bg-orange-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Write;
