"use client";

import { deleteIssue } from "@/lib/actions/issues.actions";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteIssue(issueId);
      router.push("/issues");
      setLoading(false);
      setError(false);
      setOpen(false);
      toast.success("Issue deleted successfully");
    } catch (error) {
      setOpen(false);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Button color="ruby" onClick={() => setOpen(true)}>
        <MdDeleteOutline size={20} />
        Delete Issue
      </Button>
      <AlertDialog.Root open={isOpen}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="ruby"
                onClick={() => {
                  handleDelete();
                }}
                loading={isLoading}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            There was an error deleting the issue.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                Okay
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="iris"
                onClick={() => {
                  handleDelete();
                }}
                loading={isLoading}
              >
                Try again
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
