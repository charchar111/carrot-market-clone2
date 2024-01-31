import { makeClassName } from "@/libs/client/utils";

interface TextareaProps {
  label?: string;
  name?: string;
  height?: string;
  [key: string]: any;
}

export default function Textarea({
  label,
  name,
  height,
  register,
  ...rest
}: TextareaProps) {
  return (
    <>
      {!label ? null : <label htmlFor={name ? name : ""}>{label}</label>}

      <textarea
        className={makeClassName(
          "mb-2",
          `h-${height ? [height] : 64}`,
          "w-full resize-none rounded-sm border-gray-200 shadow-sm focus:border-transparent focus:ring-2 focus:ring-orange-400",
        )}
        id={name ? name : ""}
        {...register}
        {...rest}
      />
    </>
  );
}
