import { Modal } from "antd";
import Button from "antd/lib/button";

interface IModalContentNews {
  content: string | TrustedHTML;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export default function ModalContentNews({
  content,
  handleOk,
  handleCancel,
  isModalOpen,
}: IModalContentNews) {
  return (
    <Modal title="Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>
      </div>
    </Modal>
  );
}
