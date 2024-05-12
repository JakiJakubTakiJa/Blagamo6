"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { createIssue, updateIssue } from "@/lib/actions/issues.actions";
import { IssueFormSchema } from "@/lib/validations/issue";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextField, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueFormSchema>;

const IssueForm = ({ issue }: { issue?: any }) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "OPEN" | "IN_PROGRESS" | "CLOSED"
  >(issue?.status || "OPEN");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      const postData = {
        ...data,
        status: selectedStatus,
      };
      if (issue) {
        await updateIssue({ id: issue._id, data: postData });
        toast.success("Successfully updated issue!");
      } else {
        await createIssue(postData);
        toast.success("Successfully created issue!");
      }
      setSubmiting(false);
      router.push("/issues");
    } catch (error) {
      setSubmiting(false);
      toast.error("Failed to create issue");
    }
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="flex gap-1">
          <TextField.Root
            style={{ width: "100%" }}
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          <Select.Root
            defaultValue={selectedStatus}
            onValueChange={(value: "OPEN" | "IN_PROGRESS" | "CLOSED") =>
              setSelectedStatus(value)
            }
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="OPEN">Open</Select.Item>
                <Select.Item value="IN_PROGRESS">In progress</Select.Item>
                <Select.Item value="CLOSED">Closed</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea
          className="h-80"
          defaultValue={issue?.description}
          placeholder="Description"
          {...register("description")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button loading={isSubmiting}>
          {issue ? "Update issue" : "Create new issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
