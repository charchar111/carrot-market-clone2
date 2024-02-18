import { postSelected } from "@/libs/types";
import Link from "next/link";

interface ListItemCommunityProps {
  element: postSelected;
}

export default function ListItemCommunity({ element }: ListItemCommunityProps) {
  return (
    <div>
      <Link href={`community/${element.id}`}>
        <div className="space-y-3">
          <p className=" w-max rounded-3xl bg-gray-100 p-1 px-2">동네질문</p>
          <div className=" space-x-2">
            <span className="text-lg font-semibold text-orange-400">Q.</span>
            <span className="inline-block pb-4 text-lg font-semibold">
              {element.title}
            </span>
          </div>
          <div className="flex justify-between text-gray-400 ">
            <span>{element.user.name}</span>
            <span>{element.createdAt.toString()}</span>
          </div>
          <div className="flex space-x-10 border-b-2 border-t-2 py-3">
            <div className="flex items-center space-x-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {element._count.Wonderings}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {element._count.Answers}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
