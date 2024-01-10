import { gridStyleForInput, gridStyleForNote } from "@/pages/AddUpdateNews/const";
import { TFormAddNews } from "@/pages/AddUpdateNews/types";
import { Card, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

interface ICardFormFieldInputProps {
  name: keyof TFormAddNews;
  label: string;
  rules: string[];
  isLongInput?: boolean;
}

export default function CardFormFieldInput({
  name,
  label,
  rules,
  isLongInput,
}: ICardFormFieldInputProps) {
  return (
    <Card>
      <Card.Grid hoverable={false} style={gridStyleForInput}>
        <Form.Item<TFormAddNews>
          name={name}
          label={label}
          style={{ width: "100%", marginBottom: 0 }}
          rules={[{ required: true, message: `Please input your ${name}!` }]}
        >
          {isLongInput ? <TextArea rows={4} /> : <Input />}
        </Form.Item>
      </Card.Grid>
      <Card.Grid style={gridStyleForNote}>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </Card.Grid>
    </Card>
  );
}
