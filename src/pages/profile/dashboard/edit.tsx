import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import useMutation from "@/libs/client/useMutation";
import { IResponse, apiProfileIdGet, globalProps } from "@/libs/types";
import { NextPage } from "next";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

interface formProfileEdit {
  name: string;
  phone: string;
  email: string;
}

const ProfileEdit: NextPage<globalProps> = ({ user: { user, mutate } }) => {
  const { data: userData } = useSWR<apiProfileIdGet>(
    `/api/users/profiles/dashboard`,
  );
  // console.log(userData);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors: errorForm },
  } = useForm<formProfileEdit>();
  // console.log("errorForm", errorForm);

  const [
    mutationForm,
    {
      data: dataMutationProfile,
      isLoading: isLoadingMutationProfile,
      error: errorMutationProfile,
    },
  ] = useMutation<IResponse>("/api/users/profiles/dashboard");

  const onValid: SubmitHandler<formProfileEdit> = function ({
    name,
    email,
    phone,
  }) {
    if (isLoadingMutationProfile) return;
    // console.log({ name, email, phone });

    if (name.trim() == "")
      return setError("root", {
        type: "validate",
        message: "이름은 공백만으로 이뤄지면 안됩니다.",
      });

    if (
      !(email && email.trim().length > 0) &&
      !(phone && phone.trim().length > 0)
    )
      return setError("root", {
        type: "validate",
        message:
          "인증수단으로 전화번호와 이메일 중 하나를 입력해주셔야 합니다.",
      });

    if (phone && isNaN(Number(phone)))
      return setError("root", {
        type: "validate",
        message: "휴대폰 번호는 숫자만 가능합니다.",
      });

    mutationForm({ name, email, phone });
  };
  const onInvalid = function (error: FieldErrors) {
    console.log("err", error);
  };

  useEffect(() => {
    if (userData?.profile) {
      setValue("name", userData?.profile.name);
      setValue("email", userData.profile.email);

      setValue("phone", userData.profile.phone);
    }
  }, [userData, setValue]);

  return (
    <Layout canGoBack user={user}>
      <form className="px-4 py-10" onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="head mb-10 flex items-center space-x-3">
          <div className="h-20 w-20 rounded-full bg-gray-500" />
          <div className="">
            <label className="cursor-pointer ">
              <p className="rounded-lg  bg-orange-500 p-2 px-4 text-white opacity-80 transition-all hover:opacity-100">
                Change Profill
              </p>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>

        <div>
          <Input
            label="Name"
            kind="text"
            register={register("name", {
              required: "name is required",
              minLength: { value: 4, message: "minLength is 4" },
            })}
          />
          <Input
            label="Email"
            name="input-profile-edit-email"
            kind="email"
            placeholder="abcd123@naver.com"
            register={register("email")}
          />

          <Input
            label="Phone Number"
            name="input-profile-edit-phone"
            kind="phone"
            placeholder="01012345678"
            register={register("phone")}
          />

          <ButtonDefault text="Edit" />
        </div>
        <p>
          {dataMutationProfile?.ok
            ? "변경에 성공했습니다."
            : errorMutationProfile?.message
              ? `변경 실패 : ${errorMutationProfile?.message}`
              : ""}
        </p>
      </form>
    </Layout>
  );
};

export default ProfileEdit;
