import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IResponseUseUser } from "../types";
import { globalFetcher } from "@/pages/_app";

export default function useUser() {
  const { data, error, isLoading, mutate } = useSWR<IResponseUseUser>(
    "/api/users/me",
    globalFetcher,
  );
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/enter")
      router.replace("/enter");
  }, [data, router]);

  return { user: data, isLoading, mutate };
}
