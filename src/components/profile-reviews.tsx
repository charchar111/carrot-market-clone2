import { apiProfileIdReviewsGet } from "@/libs/types";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProfileReview() {
  const router = useRouter();

  const { data: reviewData } = useSWR<apiProfileIdReviewsGet>(
    !router.query.id ? null : `/api/users/profiles/${router.query.id}/reviews`,
  );

  return (
    <section>
      <ul>
        {reviewData?.reviews.map((elment, i) => (
          <li className="user-rating mt-10" key={i}>
            <div className=" mb-5 flex  items-center ">
              <div className="mb mr-4 h-16 w-16 rounded-full bg-gray-500" />
              <div>
                <h4>{elment.createdBy.name}</h4>
                <div className="score flex">
                  {[...Array(5)].map((e, i) =>
                    i < elment.score ? (
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        key={i}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        key={i}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>{elment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
