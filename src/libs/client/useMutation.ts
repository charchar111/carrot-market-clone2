import { useState } from "react";
import { IuseMutation } from "../types";

export default function useMutation<T>(
  url: string,
): [(data: any) => Promise<void>, IuseMutation<T>] {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const mutation = async function (formData: any) {
    try {
      setData(undefined);
      setError(undefined);
      setIsLoading(true);

      const response = await (
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      ).json();
      if (!response.ok) {
        console.log("실패", response.error);
        setError(response.error);
      } else {
        setData(response);
      }

      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };
  return [mutation, { data: data!, isLoading, error }];
}
