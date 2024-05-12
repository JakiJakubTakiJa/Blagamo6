import DeleteButton from "@/components/DeleteButton";
import LinkButton from "@/components/LinkButton";
import StatusBadge from "@/components/StatusBadge";
import { getIssueById } from "@/lib/actions/issues.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import { cache } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const fetchIssue = cache((issueId: string) => getIssueById(issueId));

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await currentUser();
  const issue = await fetchIssue(id);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} className="gap-2">
      <div className="flex flex-col gap-2 max-w-xl md:col-span-4">
        <Heading>{issue.title}</Heading>
        <div className="flex gap-2 items-center">
          <StatusBadge status={issue.status} />
          <Text className="text-zinc-500">{issue.createdAt}</Text>
        </div>
        <Card>
          <Text>{issue.description}</Text>
        </Card>
      </div>

      {user!.id === issue.userId && (
        <div className="flex flex-col gap-4">
          <LinkButton href={`/issues/${id}/edit`} full>
            <HiOutlinePencilSquare size={20} />
            Edit Issue
          </LinkButton>
          <DeleteButton issueId={id} />
        </div>
      )}
    </Grid>
  );
};

export default Page;

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await fetchIssue(id);

  return {
    title: issue.title,
    description: "Details of issue " + id,
  };
}
