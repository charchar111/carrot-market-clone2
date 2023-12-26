import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error, isLoading } = useSWR<IResponseUseUser>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    console.log("userdata effect", data, isLoading);
    if (data && !data.ok) router.replace("/enter");
  }, [data, router]);

  return { userData: data, isLoading };
}
