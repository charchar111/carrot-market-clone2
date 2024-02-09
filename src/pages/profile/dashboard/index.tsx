import { Layout } from "@/components/layouts";
import { apiProfileIdGet, globalProps } from "@/libs/types";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const Profile: NextPage<globalProps> = ({ user: { user, mutate } }) => {
  const { data } = useSWR<apiProfileIdGet>(`/api/users/profiles/dashboard`);
  console.log(data);
  return (
    <Layout canGoBack user={user}>
      <div id="profile-index" className="px-4 py-10">
        <div className="head mb-10 flex items-center justify-between">
          <div className=" flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-500" />
            <span className=" ml-3 font-semibold">{data?.profile.name}</span>
          </div>

          <div className="flex  justify-between">
            <div className="flex flex-col">
              <Link href={`/profile/dashboard/edit`}>
                <span className=" cursor-pointer text-gray-700 opacity-80 hover:opacity-100">
                  Edit profile
                </span>
              </Link>
              <Link href={`/profile/${data?.profile.id}`}>
                <span className=" cursor-pointer text-gray-700 opacity-80 hover:opacity-100">
                  See profile
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="list-SBL flex justify-around">
          <Link href={`/profile/${data?.profile.id}/sell`}>
            <div className="SBL__column1 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                판매내역
              </span>
            </div>
          </Link>

          <Link href={`/profile/dashboard/record?kind=buy`}>
            <div className="SBL__column2 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                구매내역
              </span>
            </div>
          </Link>

          <Link href={`/profile/dashboard/record?kind=favorite`}>
            <div className="SBL__column3 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                관심목록
              </span>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
