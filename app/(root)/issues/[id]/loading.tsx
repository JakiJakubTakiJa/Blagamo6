import { Heading, Card, Text, Skeleton } from "@radix-ui/themes";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-2 max-w-xl">
      <Heading>
        <Skeleton>Lorem ipsum</Skeleton>
      </Heading>
      <div className="flex gap-2 items-center">
        <p>
          <Skeleton>Lorem</Skeleton>
        </p>
        <Text className="text-zinc-500">
          <Skeleton>Lorem ipsum dolor sit amet</Skeleton>
        </Text>
      </div>
      <Card>
        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            nemo ullam, voluptatum nesciunt tempore incidunt sunt ipsa animi
            cupiditate nulla nobis odio qui debitis in provident. Laudantium qui
            voluptate sed.
          </Skeleton>
        </Text>
      </Card>
    </div>
  );
};

export default loading;
