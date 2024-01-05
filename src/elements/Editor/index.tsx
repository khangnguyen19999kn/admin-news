import "suneditor/dist/css/suneditor.min.css";
import "./editor.styles.scss";

import SunEditor from "suneditor-react";
import { UploadBeforeHandler, UploadInfo } from "suneditor-react/dist/types/upload";
import SunEditorCore from "suneditor/src/lib/core";

type TStateImageUpload = "create" | "update" | "delete";
interface IEditorProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  listImage?: UploadInfo<HTMLImageElement>[];
  onImageUpload?: (
    targetImgElement: HTMLImageElement,
    index: number,
    state: TStateImageUpload,
    imageInfo: UploadInfo<HTMLImageElement>,
    remainingFilesCount: number
  ) => void;
  onImageUploadBefore?: (
    files: File[],
    info: object,
    uploadHandler: UploadBeforeHandler
  ) => boolean;
  getSunEditorInstance: (sunEditor: SunEditorCore) => void;
  height?: string;
}

export default function Editor({
  onChange,
  defaultValue,
  onImageUpload,
  getSunEditorInstance,
  height = "500",
  onImageUploadBefore,
}: IEditorProps) {
  return (
    <div className="mt-5 border-[1px] border-solid border-gray-50">
      <SunEditor
        defaultValue={defaultValue}
        getSunEditorInstance={getSunEditorInstance}
        height={height}
        onChange={onChange}
        onImageUpload={onImageUpload}
        onImageUploadBefore={onImageUploadBefore}
        setOptions={{
          formats: ["p", "div", "blockquote", "pre", "h3", "h4", "h5", "h6"],
          buttonList: [
            ["bold", "italic", "underline", "removeFormat"],
            ["strike"],
            ["fontSize"],
            ["fontColor"],
            ["lineHeight", "align", "list"],
            ["table"],
            ["fullScreen", "codeView"],
            ["link", "image", "video"],
          ],
        }}
      />
    </div>
  );
}
