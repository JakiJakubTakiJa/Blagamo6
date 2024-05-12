import React from "react";
import LinkButton from "./LinkButton";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="flex justify-between mb-5">
      <IssueStatusFilter />
      <LinkButton href="/issues/new">New Issue</LinkButton>
    </div>
  );
};

export default IssueActions;
