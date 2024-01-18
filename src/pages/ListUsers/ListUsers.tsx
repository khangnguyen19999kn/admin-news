/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Skeleton from "antd/lib/skeleton";
import { useState } from "react";

import useNotification from "@/constant/hooks/useNotification";
import style from "@/pages/ListNews/ListNewsStyle.module.scss";
import TableNews from "@/pages/ListNews/components/TableNews";
import { useGetNewsList } from "@/services/api/news/useGetAllNews";
export default function ListUser() {
  const [inputName, setInputName] = useState("");
  const { data: ListNews, isLoading, refetch } = useGetNewsList();
  const { openNotification, contextHolder } = useNotification();
  let timeout: NodeJS.Timeout | null = null;

  const debouncedHandleInputName = (value: string) => {
    setInputName(value);
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      debouncedHandleInputName(value);
    }, 500);
  };

  return (
    <div className={style.container}>
      {contextHolder}
      <div className={style.groupInputButton}>
        <Input
          className={style.input}
          placeholder="Enter the name of student to find"
          onChange={handleInputName}
        />
        <Button type="primary">Add User</Button>
      </div>

      {isLoading ? <Skeleton active /> : <TableNews listNews={ListNews} refetch={refetch} />}
    </div>
  );
}
