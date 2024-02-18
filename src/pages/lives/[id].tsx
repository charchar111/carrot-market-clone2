import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import useMutation from "@/libs/client/useMutation";
import { IResponseWithStreamDetail, globalProps } from "@/libs/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

interface IFormLiveChat {
  content: string;
}

const livesDetail: NextPage<globalProps> = function ({ user: { user } }) {
  const router = useRouter();
  const [initialChatScroll, setInitialChatScroll] = useState(false);
  const {
    data: liveData,
    isLoading,
    error,
    mutate: mutateSWRLive,
  } = useSWR<IResponseWithStreamDetail>(
    router.query.id ? `/api/lives/${router.query.id}` : null,
    { refreshInterval: 2000 },
  );

  const [
    mutationLiveChat,
    { data: dataMutationLive, isLoading: isLoadingLive, error: errorLive },
  ] = useMutation(`/api/lives/${router.query?.id}/chat`);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors: formErrors },
  } = useForm<IFormLiveChat>();

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const onValid: SubmitHandler<IFormLiveChat> = function ({ content }) {
    if (isLoadingLive) return;
    if (content.trim() == "") return;
    resetField("content");
    mutationLiveChat({ content });
    mutateSWRLive(
      !router.query?.id || !user.profile.id
        ? liveData
        : liveData && {
            ...liveData,
            live: {
              ...liveData.live,
              Messages: [
                ...liveData.live.Messages,
                {
                  id: Date.now(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  content: content,
                  streamId: +router.query?.id.toString(),
                  userId: user.profile.id,
                },
              ],
            },
          },
      { revalidate: false, rollbackOnError: true },
    );
  };

  useEffect(() => {
    if (chatScrollRef.current && !initialChatScroll) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [liveData]);

  useEffect(() => {
    if (liveData) setInitialChatScroll(true);
  }, [chatScrollRef.current?.scrollTop]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [dataMutationLive]);

  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  return (
    <Layout canGoBack user={user}>
      <div className="px-4">
        <div className="mt-5 px-4 pb-10">
          <div className="video mb-5 aspect-video rounded-lg bg-gray-400"></div>
          <div className="info">
            <h2 className="pl-2 text-lg font-semibold text-gray-800">
              {liveData?.live.name}
            </h2>
          </div>
        </div>

        <section
          ref={chatScrollRef}
          className="chat-log relative  h-[50vh] overflow-y-scroll scroll-smooth border-2 border-gray-100 p-2 scrollbar scrollbar-track-slate-100 scrollbar-thumb-gray-400"
        >
          {liveData?.live.Messages.map((element, i) => {
            if (element.userId !== user.profile.id)
              return (
                <div className="message-others flex space-x-2" key={element.id}>
                  <div className="item-center flex flex-col">
                    <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
                    <p className="text-center text-sm text-gray-500">이름</p>
                  </div>

                  <div className="w-[50%] rounded-md border p-2  shadow-sm">
                    {element.content}
                  </div>
                </div>
              );
            else
              return (
                <div
                  className="message-my flex flex-row-reverse space-x-2 space-x-reverse"
                  key={element.id}
                >
                  <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
                  <div className=" w-[50%] rounded-md border p-2 shadow-sm">
                    {element.content}
                  </div>
                </div>
              );
          })}
          {/* <div className=" " ref={chatScrollRef}></div> */}
        </section>

        <div className="chat-input inset-x-2  bottom-0 mt-7  pb-5 ">
          <form
            className="relative mx-auto flex max-w-lg items-center justify-center"
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <Input kind="chat" register={register("content")} />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default livesDetail;
