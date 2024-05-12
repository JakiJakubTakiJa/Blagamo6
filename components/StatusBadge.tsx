import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusBadge = ({
  status,
}: {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}) => {
  const statusMap: Record<
    string,
    { label: string; color: "ruby" | "iris" | "jade" }
  > = {
    OPEN: {
      label: "Open",
      color: "ruby",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "iris",
    },
    CLOSED: {
      label: "Closed",
      color: "jade",
    },
  };
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
