import { UploadInfo } from "suneditor-react/dist/types/upload";

import Close from "@/assets/icons/whiteClose.svg";

interface IListImageInEditor {
  listImage: UploadInfo<HTMLImageElement>[];
  deleteImages: (index: number) => void;
}

export default function ListImageInEditor({ listImage, deleteImages }: IListImageInEditor) {
  const removeDuplicatesImage = (arr: UploadInfo<HTMLImageElement>[]) => {
    const seen = new Set();
    return arr.filter(obj => !seen.has(obj.index) && seen.add(obj.index));
  };

  const listImageShow = removeDuplicatesImage(listImage);
  return (
    <div className={`my-2 flex h-[100px] border ${listImage.length > 0 ? "block" : "hidden"}`}>
      {listImageShow.map((image, index) => {
        return (
          <div
            key={image.index}
            className="relative ml-3 border-2 border-solid border-transparent hover:border-primary-500"
          >
            <button
              className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-primary-500"
              onClick={() => deleteImages(index)}
            >
              <Close />
            </button>
            <img alt="editor-img" className="h-[96px] w-[96px]" src={image.src} />
          </div>
        );
      })}
    </div>
  );
}
