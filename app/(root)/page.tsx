import IssueChart from "@/components/IssueChart";
import IssueSummary from "@/components/IssueSummary";
import LatestIssues from "@/components/LatestIssues";
import MyIssues from "@/components/MyIssues";
import { getIssueCount } from "@/lib/actions/issues.actions";
import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const { openIssueCount, inProgressIssueCount, closedIssueCount } =
    await getIssueCount();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <div className="flex flex-col gap-5">
        <IssueSummary
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
        <IssueChart
          open={openIssueCount}
          inProgress={inProgressIssueCount}
          closed={closedIssueCount}
        />
      </div>
      <LatestIssues />
      <div className="lg:col-span-2">
        <MyIssues searchParams={searchParams} />
      </div>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker - Dashboard",
  description: "View a summary of issues",
};
