/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, DatePickerProps, Popconfirm, Popover, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import tableStyles from "./styles/tableStyle.module.scss";

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
  const [content, setContent] = useState("");
  const { mutateAsync: deleteNews } = useDeleteNews();
  const { openNotification, contextHolder } = useNotification();
  const listDataShow = listNews?.map(news => {
    return {
      ...news,
      key: news.id,
    };
  });
  const confirmDelete = async (id: string) => {
    await deleteNews(id);
    openNotification("top", "Success", "News has been deleted");
    return refetch();
  };
  const handleShowContent = (content: string) => {
    setIsModalOpen(true);
    setContent(content);
  };
  const columns: ColumnsType<TNews> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Popover content={id} trigger={"hover"}>
          <p className={tableStyles.row}>{id}</p>
        </Popover>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <Popover content={title} trigger={"hover"}>
          <p className={tableStyles.row}>{title}</p>
        </Popover>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <Popover content={description} trigger={"hover"}>
          <p className={tableStyles.row}>{description}</p>
        </Popover>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (topic: string) => <p className={tableStyles.row}>{topic}</p>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author: string) => (
        <Popover content={author} trigger={"hover"}>
          <p className={tableStyles.row}>{author}</p>
        </Popover>
      ),
    },
    {
      title: "BannerImg",
      dataIndex: "bannerImg",
      key: "bannerImg",
      render: (bannerImg: string) => (
        <a className={tableStyles.row} target="_blank" rel="noreferrer" href={bannerImg}>
          {bannerImg}
        </a>
      ),
    },
    {
      title: "View",
      dataIndex: "viewCount",
      key: "viewCount",
      render: (viewCount: string) => (
        <Popover content={viewCount} trigger={"hover"}>
          <p className={tableStyles.viewRow}>{viewCount}</p>
        </Popover>
      ),
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: (id: string) => (
        <div>
          <Popover content="Content News" trigger={"hover"}>
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                handleShowContent(id);
              }}
            >
              <EyeOutlined />
            </Button>
          </Popover>
          <Popover content="Edit News" trigger={"hover"}>
            <Button
              type="primary"
              style={{ backgroundColor: "#228B22", marginRight: "10px" }}
              onClick={() => showModal(id)}
            >
              <EditOutlined />
            </Button>
          </Popover>
          <Popconfirm
            title="Delete News"
            description="Are you sure to delete this News?"
            onConfirm={() => {
              return confirmDelete(id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Delete News" trigger={"hover"}>
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
            </Popover>
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
    openNotification("top", "Success", "Student has been updated");
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
        content={content}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Table columns={columns} dataSource={listDataShow} />
    </div>
  );
}
