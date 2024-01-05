import Editor from "@/elements/Editor";
import { TFormAddNews } from "@/pages/AddNews/types";
import { Card, Form } from "antd";
import { useRef } from "react";
import SunEditorCore from "suneditor/src/lib/core";

export default function EditorField() {
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  return (
    <Card>
      <Card.Grid hoverable={false} style={{ width: "80%" }}>
        <Form.Item<TFormAddNews>
          name="content"
          label="Content"
          style={{ width: "100%", marginBottom: 0 }}
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <Editor getSunEditorInstance={getSunEditorInstance} />
        </Form.Item>
      </Card.Grid>
      <Card.Grid style={{ width: "20%", color: "red" }}>
        <ul>
          <li>Nhập Content cho bài viết</li>
        </ul>
      </Card.Grid>
    </Card>
  );
}
