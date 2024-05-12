import { getLatestIssues } from "@/lib/actions/issues.actions";
import { Card, Heading, Table, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

const LatestIssues = async () => {
  const issues = await getLatestIssues();
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue._id}>
                <Table.Cell>
                  <div className="flex flex-col items-start">
                    <Link href={`/issues/${issue._id}`}>{issue.title}</Link>
                    <div className="hidden md:table-cell">
                      <StatusBadge status={issue.status} />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="table-cell lg:hidden">
                  <StatusBadge status={issue.status} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
