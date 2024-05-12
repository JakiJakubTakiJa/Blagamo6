import IssueActions from "@/components/IssueActions";
import IssueTableContent from "@/components/IssueTableContent";
import Pagination from "@/components/Pagination";
import { columns } from "@/constants";
import { getIssues } from "@/lib/actions/issues.actions";
import { Table, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    status: "OPEN" | "IN_PROGRESS" | "CLOSED";
    orderBy: "title" | "status" | "createdAt" | undefined;
    sortOrder: "asc" | "desc" | undefined;
    page: string;
  };
}) => {
  const page = (searchParams.page && JSON.parse(searchParams.page)) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const { formattedIssues, issueCount } = await getIssues(
    searchParams.status,
    searchParams.orderBy,
    searchParams.sortOrder,
    false,
    skip,
    pageSize
  );

  return (
    <div className="space-y-3">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <div className="flex items-center gap-2">
                  {column.value !== "author" ? (
                    <Link
                      href={{
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                          sortOrder:
                            searchParams.orderBy === column.value
                              ? searchParams.sortOrder === undefined
                                ? "asc"
                                : searchParams.sortOrder === "asc"
                                ? "desc"
                                : undefined
                              : "asc",
                        },
                      }}
                    >
                      {column.lable}
                    </Link>
                  ) : (
                    <Text>{column.lable}</Text>
                  )}
                  {column.value === searchParams.orderBy &&
                    (searchParams.sortOrder ===
                    undefined ? null : searchParams.sortOrder === "asc" ? (
                      <FaArrowUp />
                    ) : (
                      <FaArrowDown />
                    ))}
                </div>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <IssueTableContent issues={formattedIssues} />
      </Table.Root>
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Issue tracker - List",
  description: "View list of all issues",
};
