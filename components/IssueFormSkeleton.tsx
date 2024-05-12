import { Button, Skeleton } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl space-y-3">
      <div className="flex gap-1">
        <Skeleton width="85%" height="30px" />
        <Skeleton width="15%" height="30px" />
      </div>
      <Skeleton height="320px" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default IssueFormSkeleton;
