import { makeClassName } from "@/libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PropsPagination {
  pageButtonCount: number;
  totalCountData: number | undefined;
  itemPerPage: number;
  query: string;
  pathname: string;
}

export default function Pagination({
  pageButtonCount = 10,
  totalCountData,
  itemPerPage,
  query = "page",
  pathname,
}: PropsPagination) {
  const router = useRouter();
  const [pageState, setPageState] = useState<number>(0);
  const [isRenderState, setIsRenderState] = useState(false);
  const [pageDirectionState, setPageDirectionState] = useState<
    "left" | "right" | undefined
  >(undefined);

  const totalPage =
    totalCountData &&
    (totalCountData % itemPerPage === 0
      ? totalCountData / itemPerPage
      : Math.floor(totalCountData / itemPerPage) + 1);

  useEffect(() => {
    // console.log("router effect");
    if (router.query.page) {
      const page = +router.query.page.toString();
      if (isNaN(page)) router.push(`${pathname}?${query}=1`);

      if (page % 10 == 0) {
        setPageState(page / 10 - 1);
      } else {
        setPageState(Math.floor(page / 10));
      }
      setIsRenderState(true);
    }
  }, [router.pathname, router.query, setPageState, setIsRenderState]);
  // pageState를 query.page로 세팅

  // console.log("isRenderState", isRenderState, pageDirectionState);
  // console.log(totalPage, (pageState + 1) * pageButtonCount);
  // console.log(pageState);
  const changePageState = function (event: any, direction: "left" | "right") {
    switch (direction) {
      case "right": {
        if (!totalPage) return;
        if (totalPage <= (pageState + 1) * pageButtonCount) return;
        setPageState((prev) => prev + 1);
        setPageDirectionState("right");
        return;
      }

      case "left": {
        if (!totalPage) return;
        if (pageState === 0) return;
        setPageState((prev) => (prev > 0 ? prev - 1 : prev));
        setPageDirectionState("left");
        return;
      }
    }
  };
  // 페이지 화살표 버튼 클릭 시 pageState와 pageDirectionStaete 세팅

  useEffect(() => {
    // console.log("page", router.query.page, pageState, pageDirectionState);
    if (pageDirectionState !== undefined) {
      setPageDirectionState(undefined);
      router.push(
        `${pathname && router.pathname}?${query}=${
          pageState * pageButtonCount + 1
        }`,
      );
    }
  }, [pageState]);

  if (!isRenderState || pageDirectionState) {
    // console.log("렌더링 취소");
    return;
  }
  // console.log("렌더링");

  return (
    <section className="pagination px-16 ">
      <div className="mb-5 grid grid-cols-12  grid-rows-1 rounded-md  border  border-gray-300 text-gray-600 shadow-[0_0px_7px_0px_rgba(0,0,0,0.07)]">
        <div
          className={makeClassName(
            "direction-prev border- flex items-center justify-center border-r border-gray-300",
            pageState === 0 ? "cursor-default text-gray-300" : "cursor-pointer",
          )}
          onClick={(event) => changePageState(event, "left")}
        >
          <span className="relative top-[1px]">
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              className="h-[19px]"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </span>
        </div>
        {Array.from(Array(pageButtonCount).keys()).map((element, index) => {
          const pageElement = pageState * pageButtonCount + element + 1;
          if (!totalPage || pageElement > totalPage) return;

          return (
            <Link
              href={`${pathname && router.pathname}?${query}=${
                pageState * pageButtonCount + index + 1
              }`}
              key={index}
            >
              <div
                className={`flex cursor-pointer justify-center border-r border-gray-300 p-1 ${
                  router.query.page?.toString() == String(pageElement)
                    ? "bg-orange-500 text-white"
                    : ""
                } `}
              >
                <span>{pageElement}</span>
              </div>
            </Link>
          );
        })}

        <div
          className={makeClassName(
            "direction-right flex  items-center justify-center",
            totalPage && totalPage <= (pageState + 1) * pageButtonCount
              ? "cursor-default text-gray-300"
              : "cursor-pointer",
          )}
          onClick={(event) => changePageState(event, "right")}
          data-
        >
          <span className="relative top-[1px]">
            <svg
              data-slot="icon"
              fill="none"
              className="h-[19px]"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
