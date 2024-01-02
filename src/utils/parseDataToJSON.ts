import { convertStringToJSON } from "@/pages/ListNews/utils/convertStringToJSON";

export const parseDataToJSON = <T>(data?: string) => {
  const dataJSON = convertStringToJSON(data);
  if (dataJSON) return JSON.parse(dataJSON) as T[];
  return [];
};
