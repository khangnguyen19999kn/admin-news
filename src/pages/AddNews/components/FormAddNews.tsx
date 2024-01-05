import CardFormDynamicInputField from "@/pages/AddNews/components/CardFormDynamicInputField";
import CardFormFieldInput from "@/pages/AddNews/components/CardFormFieldInput";
import CardFormFieldSelect from "@/pages/AddNews/components/CardFormFieldSelect";
import CardFormInputFile from "@/pages/AddNews/components/CardFormInputFile";
import EditorField from "@/pages/AddNews/components/EditorField";
import { optionTopic } from "@/pages/AddNews/const";
import { TFormAddNews } from "@/pages/AddNews/types";
import { Button, Card, Form } from "antd";
import "suneditor/dist/css/suneditor.min.css";

export default function FormAddNews() {
  const onFinish = (values: TFormAddNews) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm<TFormAddNews>();
  const setFieldValue = (name: keyof TFormAddNews, value: string) => {
    form.setFieldsValue({ [name]: value });
  };
  console.log(form.getFieldValue("bannerImg"));
  return (
    <Form
      name="basic"
      //   initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
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
  );
}
