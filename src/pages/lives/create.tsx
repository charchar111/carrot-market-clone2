import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import InputFile from "@/components/inputFile";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { IResponse, IResponseLivePost, globalProps } from "@/libs/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface IFormLive {
  name: string;
  description?: string;
  image?: string;
  price: string;
}

const LivesCreate: NextPage<globalProps> = function ({
  user: { user, mutate },
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormLive>({ reValidateMode: "onSubmit" });

  const [
    mutationProduct,
    { data: dataLive, isLoading: isLoadingLive, error: errorLive },
  ] = useMutation<IResponseLivePost>("/api/lives");

  const onValid: SubmitHandler<IFormLive> = function (formData) {
    if (isLoadingLive) return;
    if (dataLive?.ok) return;
    console.log(formData);
    mutationProduct(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  useEffect(() => {
    if (dataLive && dataLive?.ok) router.push(`/lives/${dataLive.stream?.id}`);
  }, [dataLive, router]);

  return (
    <Layout canGoBack user={user}>
      <form
        className=" space-y-5 px-4"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <InputFile register={register("image")}>
          <svg
            className="mx-auto h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </InputFile>

        <Input
          label="Name"
          kind="text"
          register={register("name", { required: "이름은 필수입니다." })}
          errorStyle={formErrors.price ? true : false}
        />

        <div>
          <Input
            label="Price"
            kind="price"
            placeholder="0.00"
            register={register("price", {
              required: "가격은 필수입니다.",
              valueAsNumber: true,
            })}
            errorStyle={formErrors.price ? true : false}
          />
        </div>
        <div>
          <Textarea
            label="Description"
            rows={4}
            name="textarea-live-create"
            register={register("description")}
          />
        </div>
        <ButtonDefault text="Go live" />
      </form>
    </Layout>
  );
};

export default LivesCreate;
