import { postAnswer, postSelected } from "@/libs/types";
import Link from "next/link";

interface props {
  element: postAnswer;
}

export default function ListItemCommunityAnswer({ element }: props) {
  return (
    <div className="my-5 space-y-5 px-4">
      <div className="flex items-start space-x-3">
        <div className="h-8 w-8 rounded-full bg-slate-200" />
        <div>
          <span className="block text-sm font-medium text-gray-700">
            {element.user.name}
          </span>
          <span className="block text-xs text-gray-500 ">
            {element.createdAt.toString()}
          </span>
          <p className="mt-2 text-gray-700">{element.content}</p>
        </div>
      </div>
    </div>
  );
}
