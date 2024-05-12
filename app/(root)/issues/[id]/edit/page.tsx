import IssueForm from "@/components/IssueForm";
import { getIssueById } from "@/lib/actions/issues.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await currentUser();
  const issue = await getIssueById(id);

  if (!user || user.id !== issue.userId) {
    return <h1 className="text-3xl">403 Forbidden</h1>;
  }
  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Edit Issue",
  description: "Edit an issue",
};
