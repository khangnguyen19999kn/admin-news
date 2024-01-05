import { TOption } from "@/constant/types";
import { gridStyleForInput, gridStyleForNote } from "@/pages/AddNews/const";
import { TFormAddNews } from "@/pages/AddNews/types";
import { Card, Form, Select } from "antd";

interface ICardFormFieldSelectProps {
  name: keyof TFormAddNews;
  label: string;
  rules: string[];
  options: TOption[];
}

export default function CardFormFieldSelect({
  name,
  label,
  rules,
  options,
}: ICardFormFieldSelectProps) {
  return (
    <Card>
      <Card.Grid hoverable={false} style={gridStyleForInput}>
        <Form.Item<TFormAddNews>
          name={name}
          label={label}
          style={{ width: "100%", marginBottom: 0 }}
          rules={[{ required: true, message: `Please select your ${name}!` }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={options}
          />
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
