import ListItemLives from "@/components/ListItem/list-item-lives";
import FloatingButtonLink from "@/components/floating-button-link";
import { Layout } from "@/components/layouts";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import { ITEM_PER_PAGE } from "@/libs/constant";
import { IResponse, globalProps } from "@/libs/types";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export interface LiveSelected {
  id: number;
  name: string;
  createdAt: Date;
  price: number;
  user: { name: string };
}

interface IResponseLives extends IResponse {
  live: LiveSelected[] | [];
}

const getKey = (pageIndex: number, previousPageData: IResponseLives) => {
  // console.log("getKey", pageIndex, previousPageData);
  if (previousPageData && previousPageData?.live.length < ITEM_PER_PAGE)
    return null; // 끝에 도달
  return `/api/lives?page=${pageIndex + 1}`; // SWR 키
};
const Lives: NextPage<globalProps> = function ({ user: { user, mutate } }) {
  // const {
  //   data: liveData,
  //   isLoading: liveIsLoading,
  //   error: liveError,
  // } = useSWR<IResponseLives>("/api/lives");

  const {
    data: liveData,
    isLoading: liveIsLoading,
    error: liveError,
    size: liveSize,
    setSize: liveSetSize,
  } = useSWRInfinite<IResponseLives>(getKey);

  // console.log("size", liveData, liveSize);

  const infiniteScrollPage = useInfiniteScroll();

  useEffect(() => {
    liveSetSize(infiniteScrollPage);
  }, [liveSetSize, infiniteScrollPage]);

  return (
    <Layout title="스트리밍" hasTabBar user={user}>
      <div id="component-lives">
        <section className="live-list space-y-6 ">
          {liveData?.map(
            (pageElement) =>
              pageElement.live?.map((element, i) => (
                <ListItemLives element={element} key={i} />
              )),
          )}
        </section>

        <FloatingButtonLink href="/lives/create">
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
        </FloatingButtonLink>
      </div>
    </Layout>
  );
};

export default Lives;
