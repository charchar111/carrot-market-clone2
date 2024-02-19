import ButtonDefault from "@/components/button";
import { Layout } from "@/components/layouts";
import ListItemCommunityAnswer from "@/components/ListItem/list-item-community-answer";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { globalProps, IFormPostAnswer, responseTypePost } from "@/libs/types";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

const CommunityPostDetail: NextPage<globalProps> = ({ user: { user } }) => {
  const router = useRouter();

  const { data, isLoading, error, mutate } = useSWR<responseTypePost>(
    router.query.id ? `/api/community/posts/${router.query.id}` : null,
  );

  const [
    mutateWondering,
    { data: dataWondering, isLoading: isLoadingWondering },
  ] = useMutation(`/api/community/posts/${router.query.id}/wondering`);

  const onClickWondering = function () {
    if (isLoadingWondering) return;
    mutateWondering({});
    if (!data?.ok) return;
    mutate(
      async (data) => {
        if (!data) return data;
        if (!data.ok) return data;
        return {
          ...data,
          isExistWondering: !data.isExistWondering,
          post: {
            ...data.post,
            _count: {
              ...data.post._count,
              Wonderings: data.isExistWondering
                ? data.post._count.Wonderings - 1
                : data.post._count.Wonderings + 1,
            },
          },
        };
      },
      {
        revalidate: false,
      },
    );
  };

  const [
    mutationAnswer,
    { data: answerData, error: answerError, isLoading: answerLoading },
  ] = useMutation<{ ok: boolean } | undefined>(
    `/api/community/posts/${router.query.id}/answer`,
  );

  console.log(answerData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<{ answer: string }>({ reValidateMode: "onSubmit" });

  useEffect(() => {
    console.log("effect");
    if (answerData && answerData.ok) reset();
    mutate();
  }, [reset, answerData, mutate]);

  const onValid: SubmitHandler<IFormPostAnswer> = function (formData) {
    if (answerLoading) return;
    mutationAnswer(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  const sucessData = data?.ok ? data : undefined;
  return (
    <Layout canGoBack user={user}>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="profill mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {sucessData?.post.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <div className="mb-2">
              <span className="font-medium text-orange-500">Q. </span>
              {sucessData?.post.title}
            </div>
            <p className="whitespace-pre-wrap">{sucessData?.post.content}</p>
          </div>
          <div className="mt-3 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
            <button onClick={onClickWondering}>
              <span className="flex items-center space-x-2 text-sm">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {sucessData?.post._count.Wonderings}</span>
              </span>
            </button>

            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {sucessData?.post._count.Answers}</span>
            </span>
          </div>
        </div>
        {sucessData?.post.Answers.map((element, index) => (
          <ListItemCommunityAnswer element={element} key={index} />
        ))}

        <form className="px-4" onSubmit={handleSubmit(onValid, onInvalid)}>
          <Textarea
            placeholder="Answer this question!"
            rows={5}
            register={register("answer", {
              required: "답변 내용을 추가해야 합니다.",
            })}
          />
          <p className="mb-2 whitespace-pre-wrap">
            {formErrors.answer?.message}
            {"   "}
          </p>

          <ButtonDefault text={answerLoading ? "loading..." : "Reply"} />
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
