import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import InputFile from "@/components/inputFile";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { IResponse } from "@/libs/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface IFormProduct {
  name: string;
  description?: string;
  image?: string;
  price: string;
  latitude?: number;
  longitude?: number;
}

export default function UploadDetail() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormProduct>({ reValidateMode: "onSubmit" });

  const [
    mutationProduct,
    { data: dataProduct, isLoading: isLoadingProduct, error: errorProduct },
  ] = useMutation<IResponse>("/api/products");

  const onValid: SubmitHandler<IFormProduct> = function (formData) {
    if (isLoadingProduct) return;
    if (dataProduct?.ok) return;
    console.log(formData);
    mutationProduct(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  useEffect(() => {
    if (dataProduct && dataProduct?.ok) router.push("/");
  }, [dataProduct]);

  return (
    <Layout canGoBack>
      <div className="px-4 py-16">
        <form
          className="flex flex-col"
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

          <div className="mb-2">
            <Input
              label="Name"
              kind="text"
              placeholder="0.00"
              register={register("name", {
                required: "상품이름은 필수입니다.",
              })}
              errorStyle={formErrors.name ? true : false}
            />
            <span className="whitespace-pre">
              {formErrors.name?.message || " "}
            </span>
          </div>

          <div className="mb-2">
            <Input
              label="Price"
              kind="price"
              placeholder="0.00"
              register={register("price", { required: "가격은 필수입니다." })}
              errorStyle={formErrors.price ? true : false}
            />
            <span className="whitespace-pre">
              {formErrors.price?.message || ` `}
            </span>
          </div>

          <Textarea
            name="textarea-upload"
            label="Description"
            row="4"
            register={register("description")}
          />

          <ButtonDefault
            text={isLoadingProduct ? "Loading..." : "Upload product"}
          />
        </form>
      </div>
    </Layout>
  );
}
