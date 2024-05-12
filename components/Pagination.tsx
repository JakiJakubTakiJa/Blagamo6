"use client";

import { Button, Text } from "@radix-ui/themes";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const seachParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(seachParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <RxDoubleArrowLeft />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
        </Button>
      </div>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <div className="flex gap-2">
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <IoIosArrowForward />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(pageCount)}
        >
          <RxDoubleArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
