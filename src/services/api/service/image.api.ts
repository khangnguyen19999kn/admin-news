import { newsApiBase } from "@/services/api/service/news.api";
type TImageUploadResponse = {
  imageUrl: string;
};
type TImageDeleteResponse = {
  result: string;
};
const pathImageAPI = {
  UPLOAD: "image/upload",
  DELETE: "image/delete",
};
const imageAPI = {
  upload: async (formData: FormData) => {
    const response = await newsApiBase.post<TImageUploadResponse>(pathImageAPI.UPLOAD, formData);
    return response.data;
  },
  delete: async (imageUrl: string) => {
    const response = await newsApiBase.delete<TImageDeleteResponse>(pathImageAPI.DELETE, {
      data: { imageUrl },
    });
    return response.data;
  },
};
export default imageAPI;
