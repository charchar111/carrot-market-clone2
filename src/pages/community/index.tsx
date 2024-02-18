import FlashMessage from "@/components/flashMessage";
import FloatingButtonLink from "@/components/floating-button-link";
import { Layout } from "@/components/layouts";
import ListItemCommunity from "@/components/ListItem/list-item-community";
import useGeolocation from "@/libs/client/useGeolocation";
import useUser from "@/libs/client/useUser";
import { responseType, responseTypePosts } from "@/libs/types";
import Link from "next/link";

import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Community() {
  const [state, setState] = useState("20");
  useEffect(() => {
    setTimeout(() => setState("40"), 2000);
  }, []);

  const { userData, isLoading: userIsLoading, mutate: userMutate } = useUser();
  const {
    latitude,
    longitude,
    isLoading: geoIsloading,
    error: geoError,
  } = useGeolocation();

  useEffect(() => {
    if (userData?.flashMessage)
      setTimeout(() => {
        userMutate((data: any) => ({ ...data, flashMessage: undefined }), {
          revalidate: false,
        });
      }, 2500);
  }, [userData, userMutate]);

  const { data, isLoading, error } = useSWR<responseTypePosts>(
    geoIsloading
      ? null
      : geoError
        ? `/api/community/posts`
        : `/api/community/posts?latitude=${latitude}&longitude=${longitude}`,
  );
  console.log(latitude, longitude, geoIsloading, geoError);
  console.log(data, isLoading, error);
  const successData = data?.ok ? data.posts : undefined;
  return (
    <Layout title="동네 생활" hasTabBar>
      {!userData || !userData.ok ? null : (
        <>
          {!userData?.flashMessage ? null : (
            <FlashMessage flashMessage={userData?.flashMessage} />
          )}
          <div id="community-index" className="space-y-14 px-3 pt-5">
            {successData?.map((element, i) => (
              <ListItemCommunity key={i} element={element} />
            ))}
            <FloatingButtonLink href="community/write" bottom={state}>
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
            </FloatingButtonLink>
          </div>
        </>
      )}
    </Layout>
  );
}
