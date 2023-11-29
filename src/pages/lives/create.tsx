import ButtonDefault from "@/components/button";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";

export default function LivesCreate() {
  return (
    <Layout canGoBack>
      <div className=" space-y-5 px-4">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative flex items-center  rounded-md shadow-sm">
            <input
              id="name"
              type="email"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              required
            />
          </div>
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <div className="relative flex items-center  rounded-md shadow-sm">
            <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              id="price"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              type="text"
              placeholder="0.00"
            />
            <div className="pointer-events-none absolute right-0 flex items-center pr-3">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <Textarea label="Description" rows={4} name="textarea-live-create" />
        </div>
        <ButtonDefault text="Go live" />
      </div>
    </Layout>
  );
}
