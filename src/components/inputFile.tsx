import { UseFormRegisterReturn } from "react-hook-form";

interface InputFileProps {
  register: UseFormRegisterReturn<any>;
  children: React.ReactNode;
  rest?: any;
}

export default function InputFile({
  children: LabelsvgOrText,
  register,
  rest,
}: InputFileProps) {
  return (
    <div>
      <label className="mb-5 block w-full cursor-pointer border border-dashed border-gray-400 py-10 transition-all  hover:border-orange-400 hover:text-orange-400 ">
        {LabelsvgOrText}
        <input type="file" className="hidden" {...register} {...rest} />
      </label>
    </div>
  );
}
