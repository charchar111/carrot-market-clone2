import { useEffect, useState } from "react";

export default function useInfiniteScroll() {
  const [page, setPage] = useState(1);

  const scrollDetect = () => {
    if (
      document.documentElement.scrollHeight <=
      Math.floor(document.documentElement.scrollTop + window.innerHeight + 1)
    )
      setPage((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollDetect);

    return () => window.removeEventListener("scroll", scrollDetect);
  }, []);

  return page;
}
