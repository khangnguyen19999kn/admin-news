/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Skeleton from "antd/lib/skeleton";
import { useState } from "react";

import style from "@/pages/ListNews/ListNewsStyle.module.scss";
import TableNews from "@/pages/ListNews/components/TableNews";
import useNotification from "@/pages/ListNews/hooks/useNotification";
import { useGetNewsList } from "@/services/api/news/useGetAllNews";
export default function ListNews() {
  const [inputName, setInputName] = useState("");
  const { data: ListNews, isLoading } = useGetNewsList();
  const { openNotificationSuccess, contextHolder } = useNotification();
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
        <Button type="primary">Add News</Button>
      </div>

      {isLoading ? <Skeleton active /> : <TableNews listNews={ListNews} />}
    </div>
  );
}
