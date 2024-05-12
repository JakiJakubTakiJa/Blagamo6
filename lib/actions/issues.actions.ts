"use server";

import { revalidatePath } from "next/cache";
import Issue from "../models/issue.model";
import { connectToDB } from "../mongoose";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createIssue({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}) {
  const { userId } = auth();
  connectToDB();
  try {
    await Issue.create({ title, description, status, userId });
    revalidatePath("/issues");
  } catch (error) {
    throw new Error(`Failed to create issue: ${error}`);
  }
}

export async function getIssues(
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | undefined,
  orderBy: "title" | "status" | "createdAt" | undefined,
  searchOrder: "asc" | "desc" | undefined,
  userIssues: boolean | undefined,
  skip: number,
  limit: number
) {
  connectToDB();
  const searchOrderMap = {
    asc: 1,
    desc: -1,
  };
  try {
    const { userId } = auth();

    const issues = !userIssues
      ? await Issue.find(status ? { status } : {})
          .sort(
            orderBy && searchOrder
              ? { [orderBy]: searchOrderMap[searchOrder] as 1 | -1 }
              : {}
          )
          .skip(skip)
          .limit(limit)
      : await Issue.find({ userId: userId }).skip(skip).limit(limit);

    const issueCount = !userIssues
      ? await Issue.countDocuments(status ? { status } : {})
      : await Issue.countDocuments({ userId: userId });
    const formattedIssues = issues.map((issue) => ({
      ...issue._doc,
      createdAt: issue.createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: issue.updatedAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    return { formattedIssues, issueCount };
  } catch (error) {
    throw new Error(`Failed to get issues: ${error}`);
  }
}

export async function getIssueById(id: string) {
  connectToDB();
  try {
    const issue = await Issue.findById(id);
    const formattedIssue = {
      ...issue._doc,
      createdAt: issue.createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: issue.updatedAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    return formattedIssue;
  } catch (error) {
    notFound();
  }
}

export async function updateIssue({ id, data }: { id: string; data: any }) {
  connectToDB();
  try {
    await Issue.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    revalidatePath("/issues");
  } catch (error) {
    throw new Error(`Failed to update issue: ${error}`);
  }
}

export async function deleteIssue(id: string) {
  connectToDB();
  try {
    await Issue.findByIdAndDelete(id);
    revalidatePath("/issues");
  } catch (error) {
    throw new Error(`Failed to delete issue: ${error}`);
  }
}

export async function getLatestIssues() {
  connectToDB();
  try {
    const latestIssues = await Issue.find().sort({ createdAt: -1 }).limit(5);
    return latestIssues;
  } catch (error) {
    throw new Error(`Failed to get latest issues: ${error}`);
  }
}

export async function getIssueCount() {
  connectToDB();
  try {
    const openIssueCount = await Issue.countDocuments({ status: "OPEN" });
    const inProgressIssueCount = await Issue.countDocuments({
      status: "IN_PROGRESS",
    });
    const closedIssueCount = await Issue.countDocuments({ status: "CLOSED" });
    return { openIssueCount, inProgressIssueCount, closedIssueCount };
  } catch (error) {
    throw new Error(`Failed to get issue count: ${error}`);
  }
}
