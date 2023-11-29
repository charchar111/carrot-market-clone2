export default function UploadDetail() {
  return (
    <div className="px-4 py-16">
      <div>
        <label className="mb-5 block w-full cursor-pointer border border-dashed border-gray-400 py-10 transition-all  hover:border-orange-400 hover:text-orange-400 ">
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

          <input type="file" className="hidden" />
        </label>
      </div>
      <div>
        <label htmlFor="upload-price" className="select-none">
          Price
        </label>

        <div className="relative mb-5 flex items-center">
          <span className="pointer-events-none absolute left-2 text-gray-500">
            $
          </span>
          <input
            type="text"
            className="w-full pl-8"
            id="upload-price"
            placeholder="0.00"
          />
          <span className="pointer-events-none absolute right-5 text-gray-500">
            USD
          </span>
        </div>
      </div>
      <div>
        <label>
          <p>Description</p>

          <textarea className="mb-2 h-64 w-full resize-none" rows={4} />
        </label>
        <div></div>
      </div>
      <button className="w-full rounded-sm bg-orange-400 p-2 px-4 text-white transition-all hover:bg-orange-500">
        Upload product
      </button>
    </div>
  );
}
