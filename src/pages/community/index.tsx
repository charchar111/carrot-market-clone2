import { Layout } from "@/components/layouts";
import Link from "next/link";

export default function Community() {
  return (
    <Layout title="동네 생활" hasTabBar>
      <div id="community-index" className="space-y-14 px-3 pt-5">
        {[...Array(10)].map((_, i) => (
          <div>
            <Link href={`community/${i}`}>
              <div className="space-y-3">
                <p className=" w-max rounded-3xl bg-gray-100 p-1 px-2">
                  동네질문
                </p>
                <div className=" space-x-2">
                  <span className="text-lg font-semibold text-orange-400">
                    Q.
                  </span>
                  <span className="inline-block pb-4 text-lg font-semibold">
                    What is the best mandu restaurant?
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 ">
                  <span>니꼬</span>
                  <span>18시간 전</span>
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
                    <span>궁금해요 1</span>
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
                    <span>답변 1</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        <Link href="community/write">
          <button className="fixed bottom-12 right-12 rounded-full bg-orange-400 p-4 text-white opacity-80 transition-all hover:bg-orange-500 hover:opacity-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </Layout>
  );
}
