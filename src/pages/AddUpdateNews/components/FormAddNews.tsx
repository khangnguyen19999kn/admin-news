import useNotification from "@/constant/hooks/useNotification";
import CardFormDynamicInputField from "@/pages/AddUpdateNews/components/CardFormDynamicInputField";
import CardFormFieldInput from "@/pages/AddUpdateNews/components/CardFormFieldInput";
import CardFormFieldSelect from "@/pages/AddUpdateNews/components/CardFormFieldSelect";
import CardFormInputFile from "@/pages/AddUpdateNews/components/CardFormInputFile";
import EditorField from "@/pages/AddUpdateNews/components/EditorField";
import { optionTopic } from "@/pages/AddUpdateNews/const";
import { TFormAddNews } from "@/pages/AddUpdateNews/types";
import { newsKeys } from "@/services/api/news/queryKey";
import { useCreateNews } from "@/services/api/news/useCreateNews";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";

export default function FormAddNews() {
  const { mutateAsync: addNews } = useCreateNews();
  const QueryClient = useQueryClient();
  const { openNotification, contextHolder } = useNotification();
  const navigate = useNavigate();
  const onFinish = (values: TFormAddNews) => {
    console.log("Success:", values);
    addNews({ ...values, author: "Khang Nguyễn" })
      .then(() => {
        openNotification("top", "Success", "News has been created");
      })
      .catch((error: Error) => {
        openNotification("top", "Error", "News has not been created");
        console.error("Error adding news:", error);
      });
    QueryClient.invalidateQueries({
      queryKey: newsKeys.all(),
    })
      .then(() => {
        navigate("/news");
      })
      .catch(error => {
        console.error("Error invalidateQueries:", error);
      });
  };
  const [form] = Form.useForm<TFormAddNews>();
  const initialValues: TFormAddNews = {
    title: "123",
    description: "",
    topic: "",
    tags: ["123", "123", "456"],
    author: "",
    bannerImg: "",
    content: "",
  };
  const setFieldValue = (name: keyof TFormAddNews, value: string) => {
    form.setFieldsValue({ [name]: value });
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        initialValues={initialValues}
      >
        <Card title="Thêm bài viết mới">
          <CardFormFieldInput name="title" label="Title" rules={["Nhập title cho bài viết"]} />
          <CardFormFieldInput
            name="description"
            label="Description"
            isLongInput
            rules={["Nhập description cho bài viết"]}
          />
          <CardFormFieldSelect
            name={"topic"}
            label={"Topic"}
            rules={["Nhập topic cho bài viết"]}
            options={optionTopic}
          />
          <CardFormDynamicInputField name="tags" label="Tags" rules={["Nhập tags cho bài viết"]} />

          <CardFormInputFile
            name="bannerImg"
            label="Banner Image"
            rules={["Nhập Banner Image cho bài viết"]}
            setFieldValue={setFieldValue}
          />
          <EditorField />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Card>
      </Form>
    </>
  );
}
