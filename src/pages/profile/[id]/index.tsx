import { Layout } from "@/components/layouts";
import ProfileReview from "@/components/profile-reviews";
import { apiProfileIdGet, globalProps } from "@/libs/types";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const Profile: NextPage<globalProps> = ({ user: { user, mutate } }) => {
  const router = useRouter();

  const { data } = useSWR<apiProfileIdGet>(
    !router.query?.id ? null : `/api/users/profiles/${router.query?.id}`,
  );

  return (
    <Layout canGoBack user={user}>
      <div id="profile-index" className="px-4 py-10">
        <div className="head mb-10 flex items-center space-x-2">
          <div className="h-16 w-16 rounded-full bg-gray-500" />
          <div className="flex flex-col">
            <span className="font-semibold">{data?.profile.name}</span>
          </div>
        </div>

        <div className="list-SBL flex justify-around">
          <Link href={`/profile/${router.query?.id}/sell`}>
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
        </div>

        <ProfileReview />
      </div>
    </Layout>
  );
};

export default Profile;
