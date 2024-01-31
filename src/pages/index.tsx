import FlashMessage from "@/components/flashMessage";
import FloatingButtonLink from "@/components/floating-button-link";
import { Layout } from "@/components/layouts";
import ListItem from "@/components/list-item";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { IResponse } from "@/libs/types";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface ProductSelect {
  id: number;
  name: string;
  createdAt: Date;
  price: number;
  image: string;
  _count: { Records: number };
}

interface IResponseProducts extends IResponse {
  products: ProductSelect[] | [];
}

const Home: NextPage = () => {
  // const router = useRouter();

  const { userData, mutate } = useUser();
  const {
    data: productData,
    isLoading: productIsLoading,
    error: productError,
  } = useSWR<IResponseProducts>("/api/products");
  console.log("swr", productData, productIsLoading, productError);

  useEffect(() => {
    if (userData?.flashMessage)
      setTimeout(() => {
        mutate((data: any) => ({ ...data, flashMessage: undefined }), {
          revalidate: false,
        });
      }, 2500);
  }, [userData]);

  return (
    <Layout title="홈" hasTabBar>
      {!userData || !userData.ok ? null : (
        <>
          {!userData?.flashMessage ? null : (
            <FlashMessage flashMessage={userData?.flashMessage} />
          )}

          <div>
            {productData?.products?.map((element, i) => (
              <ListItem product={element} key={i} />
            ))}
          </div>
          <FloatingButtonLink href="/products/upload">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButtonLink>
        </>
      )}
    </Layout>
  );
};

export default Home;
