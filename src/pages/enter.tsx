import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import { useState } from "react";
import { makeClassName } from "@/libs/client/utils";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import TokenForm from "@/components/tokenForm";
import { EnterLoginForm1, responseType } from "@/libs/types";

export default function Enter() {
  const [mutation, { data, error, isLoading }] = useMutation<responseType>(
    "/api/users/confirm-address",
  );

  // console.log("mutation", data, error, isLoading);

  const {
    register,
    handleSubmit,

    resetField,
    formState: { errors },
  } = useForm<EnterLoginForm1>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    resetField("phone");
    setMethod("email");
  };
  const onPhoneClick = () => {
    resetField("email");
    setMethod("phone");
  };

  // 로그인용 폼, 함수
  const onValid: SubmitHandler<EnterLoginForm1> = function (formData) {
    // console.log(formData);

    mutation(formData);
  };
  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  return (
    <Layout title="로그인" hasTabBar canGoBack>
      <div className="mx-auto  min-w-[250px] space-y-5 px-3  py-10 text-center   ">
        <h3 className="text-2xl font-semibold">Enter to Carrot</h3>
        <div className=" relative flex flex-col items-center space-y-5 text-center">
          <div className="w-full">
            <h5 className="text-gray-500">Enter using</h5>
            <div className="tab-method mt-3 flex justify-center border-b-2 border-b-gray-300">
              <button
                className={makeClassName(
                  "w-1/2 py-4",
                  method === "email"
                    ? "font-semibold text-orange-500 outline outline-2 outline-orange-300"
                    : "",
                )}
                onClick={onEmailClick}
              >
                Email
              </button>
              <button
                className={makeClassName(
                  "w-1/2 py-4",
                  method === "phone"
                    ? "font-semibold text-orange-500 outline outline-2 outline-orange-300"
                    : "",
                )}
                onClick={onPhoneClick}
              >
                Phone
              </button>
            </div>
          </div>
          {data ? (
            <TokenForm />
          ) : (
            <form
              className="w-full px-5"
              onSubmit={handleSubmit(onValid, onInvalid)}
            >
              <div className="form-address mt-2">
                <Input
                  register={register(
                    `${method === "email" ? "email" : "phone"}`,
                    method === "email"
                      ? { required: "required" }
                      : {
                          required: "required",
                          validate: { isNan: (value) => !isNaN(Number(value)) },
                        },
                  )}
                  kind={
                    method === "email" ? "email" : "phone" ? "phone" : "text"
                  }
                  placeholder={
                    method === "email"
                      ? "abc@naver.com"
                      : "phone"
                        ? "01012345678"
                        : undefined
                  }
                />
              </div>

              <div className="error-wrapper mb-2 font-semibold  text-red-600">
                {!error ? null : (
                  <div className="error-wrapper__api">
                    <p>{error.message}</p>
                  </div>
                )}
                {method !== "email" ? null : (
                  <div className="error-wrapper__email">
                    <p>{errors.email?.message}</p>
                  </div>
                )}
                {method !== "phone" ? null : (
                  <div className="error-wrapper__phone ">
                    <p>
                      {errors.phone?.type == "isNan"
                        ? "폰 번호는 숫자로만 이뤄져야 합니다."
                        : errors.phone?.message
                          ? errors.phone?.message
                          : null}
                    </p>
                  </div>
                )}
                <p></p>
              </div>

              <ButtonDefault
                text={
                  isLoading
                    ? "Loading"
                    : method === "email"
                      ? "Get login link"
                      : "phone"
                        ? "Get one-time password"
                        : null
                }
              />
            </form>
          )}
          <div className="other-login w-full px-5">
            <div className="relative my-3">
              <div className="absolute w-full border "></div>
              <div className="relative -top-3 text-center ">
                <span className="bg-white px-2 text-gray-400">
                  Or enter with
                </span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center rounded-sm border bg-gray-100  py-2 hover:bg-gray-200">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button className="flex items-center justify-center rounded-sm border bg-gray-100 py-2  hover:bg-gray-200">
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
