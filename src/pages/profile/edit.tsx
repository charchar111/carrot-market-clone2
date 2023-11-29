export default function ProfileEdit() {
  return (
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
        <label className=" mb-5 block font-semibold text-gray-600">
          <p className="mb-1 ml-2">Email</p>
          <input
            type="email"
            placeholder="abcd123@naver.com"
            className="w-full appearance-none rounded-sm border-gray-200  p-2 placeholder-gray-400 shadow-sm  placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
            required
          />
        </label>

        <label className=" mb-5 block font-semibold text-gray-600">
          <p className="mb-1  ml-2">Phone Number</p>
          <div className="flex w-full ">
            <span className="rounded-l-sm border border-r-0   bg-gray-100  p-2 text-gray-500 ">
              +82
            </span>
            <input
              type="tel"
              className="w-full rounded-sm rounded-l-none border-gray-200 shadow-sm placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400"
              required
              placeholder="01012345678"
            />
          </div>
        </label>

        <button className="w-full rounded-sm bg-orange-400 p-2 px-4 text-white">
          Edit
        </button>
      </div>
    </div>
  );
}
