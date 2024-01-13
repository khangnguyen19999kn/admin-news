import { useGetDetailNews } from "@/services/api/news/useGetDetailNews";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import FormAddNews from "./components/FormAddNews";
import { convertNewsToFormNews } from "./const/utils";

export default function UpdateNews() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetDetailNews(id as string);
  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <FormAddNews defaultValues={convertNewsToFormNews(data)} type="update" id={id} />
      )}
    </>
  );
}
