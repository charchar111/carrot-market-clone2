import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useGeolocation from "@/libs/client/useGeolocation";
import useMutation from "@/libs/client/useMutation";
import { IResponse, globalProps } from "@/libs/types";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface IFormPost {
  title: string;
  content?: string;
  latitude?: number;
  longitude?: number;
}

const Write: NextPage<globalProps> = ({ user: { user, mutate } }) => {
  const {
    latitude,
    longitude,
    isLoading: GeoIsLoading,
    error: GeoError,
  } = useGeolocation();
  console.log(latitude, longitude, GeoIsLoading, GeoError);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormPost>({ reValidateMode: "onSubmit" });

  const [
    mutationPost,
    { data: dataPost, isLoading: isLoadingPost, error: errorPost },
  ] = useMutation<IResponse>("/api/community/posts");
  useEffect(() => {
    if (dataPost && dataPost?.ok) {
      router.push("/community");
    }
  }, [dataPost, router]);

  const onValid: SubmitHandler<IFormPost> = function (formData) {
    if (isLoadingPost) return;
    if (dataPost?.ok) return;
    console.log(formData);
    if (GeoError) return mutationPost({ ...formData });
    return mutationPost({ ...formData, latitude, longitude });
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  return (
    <Layout canGoBack user={user}>
      <div className="px-3 py-10">
        <form
          className="flex flex-col "
          onSubmit={handleSubmit(onValid, onInvalid)}
        >
          <Input
            kind="text"
            placeholder="Write a title"
            register={register("title", {
              required: "제목은 필수로 작성해야 합니다.",
            })}
          />
          <span className="mb-5 mt-[-5px] whitespace-pre">
            {formErrors.title?.message || " "}
          </span>
          <Textarea
            rows={6}
            placeholder="Ask a question!"
            register={register("content")}
          />

          <ButtonDefault text={isLoadingPost ? "loading" : "Submit"} />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
