import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <div className="flex gap-4">
      {statuses.map((status) => (
        <Card key={status.status} className="w-1/3">
          <div className="flex flex-col gap-1">
            <Link className="text-sm" href={`/issues?status=${status.status}`}>
              {status.label}
            </Link>
          </div>
          <Text size="5" weight="bold">
            {status.value}
          </Text>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
