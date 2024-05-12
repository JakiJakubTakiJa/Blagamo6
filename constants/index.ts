const navBarLinks = [
  {
    Label: "Dashboard",
    route: "/",
  },
  {
    Label: "Issues",
    route: "/issues",
  },
];

export const statuses = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

export const columns = [
  {
    lable: "Title",
    value: "title",
  },
  {
    lable: "Status",
    value: "status",
  },
  {
    lable: "Created / Updated",
    value: "updatedAt",
    className: "hidden md:table-cell",
  },
];

export default navBarLinks;
