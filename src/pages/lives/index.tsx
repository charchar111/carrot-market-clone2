import { Layout } from "@/components/layouts";
import Link from "next/link";

export default function Lives() {
  return (
    <Layout title="스트리밍" hasTabBar>
      <div id="component-lives">
        <section className="live-list space-y-6 ">
          {Array.from(Array(10)).map((_, i) => (
            <div
              key={i}
              className="list__element  border-b-2    last:border-b-0 "
            >
              <Link href={`/lives/${i}`}>
                <div className="mt-5 px-4 pb-10">
                  <div className="video mb-2 aspect-video rounded-lg bg-gray-400"></div>
                  <div className="info">
                    <h2 className="text-lg font-semibold text-gray-800">
                      We want happy
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        <Link href="/lives/create">
          <button className="fixed bottom-12 right-12 rounded-full bg-orange-400 p-4 text-white opacity-80 transition-all hover:bg-orange-500 hover:opacity-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </Layout>
  );
}
