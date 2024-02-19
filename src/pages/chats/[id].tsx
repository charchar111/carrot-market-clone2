import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import { globalProps } from "@/libs/types";
import { NextPage } from "next";

const ChatDetail: NextPage<globalProps> = function ({
  user: { user, mutate },
}) {
  return (
    <Layout canGoBack user={user}>
      <div id="chat-detail" className="space-y-5 px-4 ">
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

        <div className="chat-input fixed inset-x-2  bottom-0 pb-5  ">
          <div className="relative mx-auto flex max-w-lg items-center justify-center  ">
            <Input kind="chat" />
            {/* <input
              type="text"
              className=" w-full  rounded-md border-gray-400 pr-10 shadow-lg"
            /> */}
            {/* <div className="absolute right-1 rounded-full bg-orange-400 p-1 px-2 text-white">
              <span>&rarr;</span>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ChatDetail;
