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
import { useUpdateNews } from "@/services/api/news/useUpdateNews";
import { useManagementDisplayName } from "@/zustands/useManagementDisplayName";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";

interface IFormAddNews {
  defaultValues: TFormAddNews;
  type?: "add" | "update";
  id?: string;
}

export default function FormAddNews({ defaultValues, type = "add", id }: IFormAddNews) {
  const { mutateAsync: addNews } = useCreateNews();
  const { displayName } = useManagementDisplayName();
  const { mutateAsync: updateNews } = useUpdateNews(id || "");
  const QueryClient = useQueryClient();
  const { openNotification, contextHolder } = useNotification();
  const navigate = useNavigate();
  const revalidate = () => {
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
  const onFinish = (values: TFormAddNews) => {
    console.log("Success:", type);
    if (type === "add") {
      addNews({ ...values, author: displayName })
        .then(() => {
          openNotification("top", "Success", "News has been added");
          revalidate();
        })
        .catch(err => {
          console.error(err);
        });
      return;
    }
    updateNews({ ...values, author: defaultValues.author })
      .then(() => {
        openNotification("top", "Success", "News has been updated");
        revalidate();
      })
      .catch(err => {
        console.error(err);
      });
  };
  const [form] = Form.useForm<TFormAddNews>();
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
        initialValues={defaultValues}
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
            defaultValues={defaultValues.bannerImg}
          />
          <EditorField defaultValues={defaultValues.content} />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              {type === "add" ? "Thêm" : "Cập nhật"}
            </Button>
          </div>
        </Card>
      </Form>
    </>
  );
}
