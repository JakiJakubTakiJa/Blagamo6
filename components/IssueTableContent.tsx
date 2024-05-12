"use client";

import { Table } from "@radix-ui/themes";
import StatusBadge from "./StatusBadge";
import Link from "./Link";

const IssueTableContent = ({ issues }: { issues: any[] }) => {
  return (
    <Table.Body>
      {issues.map((issue) => {
        return (
          <Table.Row key={issue._id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue._id}`}>{issue.title}</Link>
            </Table.RowHeaderCell>
            <Table.Cell>
              <StatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

export default IssueTableContent;
