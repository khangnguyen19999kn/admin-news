import {
  formItemLayout,
  formItemLayoutWithOutLabel,
  gridStyleForListForm,
  gridStyleForNote,
} from "@/pages/AddNews/const";
import { TFormAddNews } from "@/pages/AddNews/types";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";

interface ICardFormDynamicInputFieldProps {
  name: keyof TFormAddNews;
  label: string;
  rules: string[];
}
export default function CardFormDynamicInputField({
  name,
  label,
  rules,
}: ICardFormDynamicInputFieldProps) {
  return (
    <Card>
      <Card.Grid hoverable={false} style={gridStyleForListForm}>
        <Form.List
          name={name}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error(`At least 2 ${name}`));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? label : ""}
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  style={{ width: "100%", marginBottom: "10px" }}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: `Please input ${name} name or delete this field.`,
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder={`${label}s name`} style={{ width: "60%" }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      onClick={() => remove(field.name)}
                      danger
                      style={{ marginLeft: "10px" }}
                    >
                      <MinusCircleOutlined className="dynamic-delete-button" />
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ marginBottom: "10px" }}
                >
                  Add field
                </Button>
              </Form.Item>

              <span style={{ color: "red" }}>
                <Form.ErrorList errors={errors} />
              </span>
            </>
          )}
        </Form.List>
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
