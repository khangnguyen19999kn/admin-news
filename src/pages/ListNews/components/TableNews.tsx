/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, DatePickerProps, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

// import { useUpdateStudent } from "@/services/api/students/useUpdateStudent";

import { TNews } from "../types";

import ModalContentNews from "@/pages/ListNews/components/ModalContentNews";

import useNotification from "@/constant/hooks/useNotification";
import { useDeleteNews } from "@/services/api/news/useDeleteNews";

interface ITableNews {
  listNews?: TNews[];
  refetch?: any;
}

export default function TableNews({ listNews, refetch }: ITableNews) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: deleteNews } = useDeleteNews();
  const { openNotificationSuccess, contextHolder } = useNotification();
  const listDataShow = listNews?.map(news => {
    return {
      ...news,
      key: news.id,
    };
  });
  const confirmDelete = async (id: string) => {
    await deleteNews(id);
    openNotificationSuccess("top", "Success", "News has been deleted");
    return refetch();
  };
  const columns: ColumnsType<TNews> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "BannerImg",
      dataIndex: "bannerImg",
      key: "bannerImg",
      render: (bannerImg: string) => (
        <a
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "300px",
            display: "inline-block",
          }}
          target="_blank"
          rel="noreferrer"
          href={bannerImg}
        >
          {bannerImg}
        </a>
      ),
    },
    {
      title: "View",
      dataIndex: "viewCount",
      key: "viewCount",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: (key: string) => (
        <div>
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => showModal(key)}
            icon={<EyeOutlined />}
          >
            Content
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#228B22", marginRight: "10px" }}
            onClick={() => showModal(key)}
            icon={<EditOutlined />}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete News"
            description="Are you sure to delete this News?"
            onConfirm={() => {
              return confirmDelete(key);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [dataDetail, setDataDetail] = useState<TNews>();

  const showModal = (id: string) => {
    console.log(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: TNews) => {
    // await updateStudentMutation(values as unknown as string);
    setIsModalOpen(false);
    openNotificationSuccess("top", "Success", "Student has been updated");
    return refetch();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange: DatePickerProps["onChange"] = dateString => {
    console.log(dateString);
  };

  // const { mutateAsync: updateStudentMutation } = useUpdateStudent();

  // const handleTestButton = (id: string) => {
  //   const detailStudent = listDataShow?.filter(student => student.Id === id)[0];
  //   setDataDetail(detailStudent);
  // };
  return (
    <div>
      {contextHolder}
      <ModalContentNews
        content={"<h1>FUCK</h1>"}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Table columns={columns} dataSource={listDataShow} />
    </div>
  );
}
