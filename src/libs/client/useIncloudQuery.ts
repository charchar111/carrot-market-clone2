import { useRouter } from "next/router";
import { useEffect } from "react";

interface ArgUseIncludeQuery {
  query: string;
  redirectValue: string;
}

/**
 * 쿼리스트링을 검사하여 없을 시 쿼리스트링을 넣어 리다이렉트
 * @param { query: string, redirectValue: string}
 *  * query = 필요한 쿼리스트링, redirectValue= 리다이렉트할 쿼리스트링의 값
 * @returns {void}
 */
export default function useIncludeQuery({
  query,
  redirectValue,
}: ArgUseIncludeQuery) {
  const router = useRouter();
  useEffect(() => {
    if (!router.query[query] && !router.asPath.includes(`?${query}=`))
      router.replace(`${router.asPath}?${query}=${redirectValue}`);
  }, [router, query, redirectValue]);
}
