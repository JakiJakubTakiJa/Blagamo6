import { Card, Heading, Link, Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import { getIssues } from "@/lib/actions/issues.actions";
import { useSearchParams } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const MyIssues = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) => {
  const page = (searchParams.page && JSON.parse(searchParams.page)) || 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  const { formattedIssues, issueCount } = await getIssues(
    undefined,
    undefined,
    undefined,
    true,
    skip,
    pageSize
  );

  const user = await currentUser();

  if (!user) return null;

  if (formattedIssues.length === 0) return null;

  return (
    <Card>
      <Heading size="4" mb="5">
        My Issues
      </Heading>
      <Table.Root className="mb-5">
        <Table.Body>
          {formattedIssues.map((issue) => {
            return (
              <Table.Row key={issue._id}>
                <Table.Cell>
                  <Link href={`/issues/${issue._id}`}>{issue.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge status={issue.status} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Card>
  );
};

export default MyIssues;
