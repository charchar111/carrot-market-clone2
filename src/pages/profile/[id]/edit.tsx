import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";

export default function ProfileEdit() {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="head mb-10 flex items-center space-x-3">
          <div className="h-20 w-20 rounded-full bg-gray-500" />
          <form className="">
            <label className="cursor-pointer ">
              <p className="rounded-lg  bg-orange-500 p-2 px-4 text-white opacity-80 transition-all hover:opacity-100">
                Change Profill
              </p>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </form>
        </div>

        <div>
          {/* <label className=" mb-5 block font-semibold text-gray-600">
            <p className="mb-1 ml-2">Email</p>
            <input
              type="email"
              placeholder="abcd123@naver.com"
              className="w-full appearance-none rounded-sm border-gray-200  p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
              required
            />
          </label> */}
          <Input
            label="Email"
            name="input-profile-edit-email"
            kind="email"
            required
            placeholder="abcd123@naver.com"
          />

          <Input
            label="Phone Number"
            name="input-profile-edit-phone"
            kind="phone"
            required
            placeholder="01012345678"
          />

          <ButtonDefault text="Edit" />
        </div>
      </div>
    </Layout>
  );
}
