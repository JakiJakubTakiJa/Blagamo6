"use client";

import { statuses } from "@/constants";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (status: any) => {
    const params = new URLSearchParams();
    if (status !== "ALL") params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("sortOrder"))
      params.append("sortOrder", searchParams.get("sortOrder")!);
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push("/issues" + query);
  };

  return (
    <Select.Root
      onValueChange={(status) => {
        handleChange(status);
      }}
      defaultValue={searchParams.get("status") || undefined}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
