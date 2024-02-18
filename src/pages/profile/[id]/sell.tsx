import FloatingButtonLink from "@/components/floating-button-link";
import { Layout } from "@/components/layouts";
import ListItem from "@/components/ListItem/list-item";
import { apiProfileIdRecordGet, globalProps } from "@/libs/types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const profileSell: NextPage<globalProps> = ({ user: { user, mutate } }) => {
  const router = useRouter();
  const { data: sellData } = useSWR<apiProfileIdRecordGet>(
    !router.query.id
      ? null
      : `/api/users/profiles/${router.query.id}/record?kind=sell`,
  );

  return (
    <Layout canGoBack user={user}>
      <div>
        {sellData?.record.map((element, i) => (
          <ListItem product={element.product} key={i} />
        ))}

        <FloatingButtonLink href="/products/upload" bottom="10">
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
      </div>
    </Layout>
  );
};
export default profileSell;
