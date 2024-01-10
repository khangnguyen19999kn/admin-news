import { gridStyleForInput, gridStyleForNote } from "@/pages/AddUpdateNews/const";
import { TFormAddNews } from "@/pages/AddUpdateNews/types";
import { useDeleteImage } from "@/services/api/images/useDeleteImage";
import { useUploadImage } from "@/services/api/images/useUploadImage";
import { Button, Card, Form, Input } from "antd";
import { useRef, useState } from "react";
interface ICardFormFieldInputFileProps {
  name: keyof TFormAddNews;
  label: string;
  rules: string[];
  setFieldValue: (name: keyof TFormAddNews, value: string) => void;
}

export default function CardFormInputFile({
  name,
  label,
  rules,
  setFieldValue,
}: ICardFormFieldInputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const isChooseFile = fileName === "";
  const { mutateAsync: uploadImage, isPending } = useUploadImage();
  const { mutateAsync: deleteImage } = useDeleteImage();
  const buttonClick = async () => {
    isChooseFile ? inputRef.current?.click() : await removeFile();
  };
  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadImage(formData, {
        onSuccess: data => {
          setFileName(data.imageUrl);
          setFieldValue(name, data.imageUrl);
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const removeFile = async () => {
    setFileName("");
    setFieldValue(name, "");
    await deleteImage(fileName);
  };

  const changeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  return (
    <Card>
      <Card.Grid hoverable={false} style={gridStyleForInput}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={async e => {
            await changeFile(e);
          }}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <Form.Item<TFormAddNews>
          name={name}
          label={label}
          style={{ width: "100%", marginBottom: 0 }}
          rules={[{ required: true, message: `Please input your ${name}!` }]}
          shouldUpdate={(prevValues, curValues) => prevValues[name] !== curValues[name]}
        >
          <div style={{ display: "flex" }}>
            <Input
              style={{ margin: "0 10px", display: "flex", alignItems: "center" }}
              key={name}
              value={isPending ? "Uploading..." : fileName}
              disabled
            />

            <Button onClick={buttonClick} danger={!isChooseFile}>
              {isChooseFile ? "Choose File" : "Remove File"}
            </Button>
          </div>
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
