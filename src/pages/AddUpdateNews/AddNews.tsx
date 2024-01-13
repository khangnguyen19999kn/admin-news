import FormAddNews from "@/pages/AddUpdateNews/components/FormAddNews";
import { initialValues } from "./const";

export default function AddNews() {
  return (
    <>
      <FormAddNews defaultValues={initialValues} />
    </>
  );
}
