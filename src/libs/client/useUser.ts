import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IResponseUseUser } from "../types";

export default function useUser() {
  const { data, error, isLoading, mutate } =
    useSWR<IResponseUseUser>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) router.replace("/enter");
  }, [data, router]);

  return { userData: data, isLoading, mutate };
}
