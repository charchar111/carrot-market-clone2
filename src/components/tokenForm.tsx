import { makeClassName } from "@/libs/client/utils";
import ButtonDefault from "./button";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { responseType } from "@/libs/types";

interface EnterLoginTokenForm {
  token: string;
}

export default function TokenForm() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [mutation, { data, error, isLoading }] = useMutation<responseType>(
    "/api/users/confirm-token",
  );

  useEffect(() => {
    if (data?.ok) {
      mutate("/api/users/me", (data: any) => ({
        ...data,
        ok: true,
      })).then(() => router.push("/"));
    }
  }, [data, router]);

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<EnterLoginTokenForm>();

  const onValid: SubmitHandler<EnterLoginTokenForm> = function (formData) {
    // console.log(formData);
    mutation(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    // console.log(error);
  };

  return (
    <form
      className="form-method w-full px-5"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <div className="mt-2">
        <Input
          register={register("token", { required: true })}
          kind="text"
          placeholder="token"
        />
      </div>

      <div className="error-wrapper mb-2 font-semibold  text-red-600">
        <div className="error-wrapper__token">
          <p>{formError.token?.message}</p>
        </div>
        {!error ? null : (
          <div className="error-wrapper__api">
            <p>{error.message}</p>
          </div>
        )}
      </div>

      <ButtonDefault text={isLoading ? "Loading" : "Submit Token"} />
    </form>
  );
}
