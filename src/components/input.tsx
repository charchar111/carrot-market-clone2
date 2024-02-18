import { makeClassName } from "@/libs/client/utils";

interface InputProps {
  kind?: "price" | "phone" | "email" | "chat" | "text";
  label?: string;
  name?: string;
  register?: any;
  [key: string]: any;
}

export default function Input({
  kind = "text",
  label,
  name,
  register,
  errorStyle,
  ...rest
}: InputProps) {
  let inputPrice;
  let inputPhone;
  let inputEmail;
  let inputChat;
  let inputText;
  switch (kind) {
    case "chat":
      inputChat = (
        <>
          <input
            {...register}
            type="text"
            className=" w-full  rounded-md border-gray-400 pr-10 shadow-lg "
            {...rest}
          />
          <button className="absolute right-1 rounded-full  bg-orange-400  px-2 pb-1 text-white">
            <span>&rarr;</span>
          </button>
        </>
      );
      break;
    case "text":
      inputText = (
        <input
          {...register}
          id={name ? name : undefined}
          type="text"
          className={makeClassName(
            "mb-5 w-full appearance-none rounded-sm",
            errorStyle ? " border-red-500" : "border-gray-200",
            "p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400",
          )}
          {...rest}
        />
      );
      break;
    case "email":
      inputEmail = (
        <input
          {...register}
          id={name ? name : undefined}
          type="email"
          className="mb-5 w-full appearance-none rounded-sm border-gray-200  p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
          {...rest}
        />
      );
      break;
    case "phone":
      inputPhone = (
        <button className="mb-5 flex w-full ">
          <span className="rounded-l-sm border border-r-0   bg-gray-100  p-2 text-gray-500 ">
            +82
          </span>
          <input
            {...register}
            id={name ? name : undefined}
            type="tel"
            className="w-full rounded-sm rounded-l-none border-gray-200 shadow-sm placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            {...rest}
          />
        </button>
      );
      break;

    case "price":
      inputPrice = (
        <button className="relative mb-5 flex items-center text-gray-300">
          <span className="pointer-events-none absolute left-2">$</span>

          <input
            {...register}
            type="text"
            className={makeClassName(
              "w-full rounded-sm",
              errorStyle ? "border-red-500" : "border-gray-200",
              "pl-8 shadow-sm placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400",
            )}
            id={name}
            {...rest}
          />
          <span className=" pointer-events-none absolute right-5">USD</span>
        </button>
      );
      break;
  }
  return (
    <>
      {!label ? null : (
        <label htmlFor={name} className="select-none">
          {label}
        </label>
      )}
      {inputChat ? inputChat : null}
      {inputText ? inputText : null}
      {inputEmail ? inputEmail : null}
      {inputPhone ? inputPhone : null}
      {inputPrice ? inputPrice : null}
    </>
  );
}
