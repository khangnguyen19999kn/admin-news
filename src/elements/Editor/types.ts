export type TUploadBeforeResponse = {
  errorMessage?: string;
  result: TFileInfo[];
};
export type TFileInfo = {
  url: string;
  name: string;
  size: number;
};
export type TStateImageUpload = "create" | "update" | "delete";
