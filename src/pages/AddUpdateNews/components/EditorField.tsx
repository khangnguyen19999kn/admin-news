import Editor from "@/elements/Editor";
import { TFileInfo, TStateImageUpload, TUploadBeforeResponse } from "@/elements/Editor/types";
import { TFormAddNews } from "@/pages/AddUpdateNews/types";
import { useDeleteImage } from "@/services/api/images/useDeleteImage";
import { useUploadImage } from "@/services/api/images/useUploadImage";
import { EImageStatusEditor } from "@/services/enum";
import { Card, Form, Spin } from "antd";
import { useRef } from "react";
import { UploadBeforeHandler, UploadInfo } from "suneditor-react/dist/types/upload";
import SunEditorCore from "suneditor/src/lib/core";
import editorStyle from "./styles/editorStyle.module.scss";
export default function EditorField() {
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  const listImageRef = useRef<string[]>([]);
  const { mutateAsync: uploadImage, isPending } = useUploadImage();
  const { mutateAsync: deleteImage } = useDeleteImage();
  const handleImageStateChange = (
    _targetImgElement: HTMLImageElement,
    index: number,
    state: TStateImageUpload,
    imageInfo: UploadInfo<HTMLImageElement>
  ) => {
    if (state === EImageStatusEditor.CREATE) {
      listImageRef.current.push(imageInfo.src);
      return;
    }
    if (state === EImageStatusEditor.DELETE) {
      const imageSrc = listImageRef.current[index];
      deleteImage(imageSrc)
        .then(() => {
          editor.current?.getImagesInfo().splice(index, 1);
          return;
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const uploadImageAndGetURL = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const handleUpLoadFile = (files: File[], uploadHandler: UploadBeforeHandler) => {
    uploadImageAndGetURL(files[0])
      .then(res => {
        if (!res) {
          return;
        }
        const fileInfo: TFileInfo = {
          name: files[0].name,
          size: 100,
          url: res.imageUrl,
        };
        const uploadResponse: TUploadBeforeResponse = {
          errorMessage: undefined,
          result: [fileInfo],
        };
        uploadHandler(uploadResponse);
      })
      .catch(err => {
        console.error(err);
      });
  };
  function resizeImage(files: File[], uploadHandler: UploadBeforeHandler) {
    const [uploadFile] = files;
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e?.target?.result as string;
      img.onload = function () {
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const MAX_WIDTH = 960;
        const MAX_HEIGHT = 400;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = 960;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            blob &&
              handleUpLoadFile(
                [new File([blob], uploadFile.name, { type: uploadFile.type })],
                uploadHandler
              );
          },
          uploadFile.type,
          1
        );
      };
    };

    reader.readAsDataURL(uploadFile);
  }

  const handleImageUploadBefore = (
    files: File[],
    _info: object,
    uploadHandler: UploadBeforeHandler
  ) => {
    resizeImage(files, uploadHandler);

    return false;
  };

  return (
    <Card>
      <Card.Grid hoverable={false} style={{ position: "relative", width: "80%" }}>
        {isPending && (
          <div className={editorStyle.wrapperContent}>
            <Spin />
          </div>
        )}
        <Form.Item<TFormAddNews>
          name="content"
          label="Content"
          style={{ width: "100%", marginBottom: 0 }}
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <Editor
            getSunEditorInstance={getSunEditorInstance}
            onImageUpload={handleImageStateChange}
            onImageUploadBefore={handleImageUploadBefore}
          />
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
