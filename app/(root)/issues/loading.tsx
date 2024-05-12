import IssueActions from "@/components/IssueActions";
import { Skeleton, Table } from "@radix-ui/themes";

const loading = () => {
  const issues = ["", "", "", "", ""];
  return (
    <div className="space-y-3">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created / Updated
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton width="25px" height="25px" />
              </Table.RowHeaderCell>
              <Table.RowHeaderCell>
                <Skeleton>Lorem ipsum</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Skeleton>Lorem ipsum</Skeleton>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton>Lorem ipsum</Skeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loading;
