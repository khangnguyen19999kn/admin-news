import { useGetDetailNews } from "@/services/api/news/useGetDetailNews";
import { Modal, Spin } from "antd";
import Button from "antd/lib/button";
import styleModal from "./styles/modalContentNewsStyle.module.scss";
interface IModalContentNews {
  id: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export default function ModalContentNews({
  id,
  handleOk,
  handleCancel,
  isModalOpen,
}: IModalContentNews) {
  const { data, isLoading } = useGetDetailNews(id);
  const { title, description, content: contentNews } = data || {};
  return (
    <Modal title="Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      {isLoading ? (
        <div className={styleModal.loadingSide}>
          <Spin />
        </div>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
          <div dangerouslySetInnerHTML={{ __html: contentNews || "" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={handleOk}>
              OK
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
