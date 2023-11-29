export default function livesDetail() {
  return (
    <div className="px-4 py-10">
      <div className="mt-5 px-4 pb-10">
        <div className="video mb-5 aspect-video rounded-lg bg-gray-400"></div>
        <div className="info">
          <h2 className="pl-2 text-lg font-semibold text-gray-800">
            We want happy
          </h2>
        </div>
      </div>

      <section className="chat-log h-[50vh] space-y-4 overflow-auto border-2 border-gray-100 p-2">
        {[...Array(14)].map((_, i) => {
          if (i % 3 === 0)
            return (
              <div className="message-others flex space-x-2 ">
                <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
                <div className="w-[50%] rounded-md border p-2  shadow-sm">
                  Hi how much are you selling them for?
                </div>
              </div>
            );
          if (i % 3 === 1)
            return (
              <div className="message-my flex flex-row-reverse space-x-2 space-x-reverse  ">
                <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
                <div className=" w-[50%] rounded-md border p-2 shadow-sm">
                  I want 20,000₩
                </div>
              </div>
            );

          if (i % 3 === 2)
            return (
              <div className="message-others flex space-x-2 ">
                <div className="profill-img my-1 h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-400 " />
                <div className="w-[50%] rounded-md border p-2  shadow-sm">
                  미쳤어
                </div>
              </div>
            );
          return null;
        })}
      </section>

      <div className="chat-input inset-x-2  bottom-0 mt-7  pb-5 ">
        <div className="relative mx-auto flex max-w-lg items-center justify-center  ">
          <input
            type="text"
            className=" w-full  rounded-md border-gray-400 pr-10 shadow-lg"
          />
          <div className="absolute right-1 cursor-pointer rounded-full bg-orange-400 p-1 px-2 text-white">
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
