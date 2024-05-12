import IssueForm from "@/components/IssueForm";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Create Issue",
  description: "Create new issue",
};
