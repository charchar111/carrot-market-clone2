import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-3 py-10">
        <form className="flex flex-col space-y-4 ">
          <Input kind="text" placeholder="Write a title" />
          <Textarea rows={6} placeholder="Ask a question!" />
          <ButtonDefault text="Submit" />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
