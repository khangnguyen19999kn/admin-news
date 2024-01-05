export const gridStyleForInput: React.CSSProperties = {
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const gridStyleForNote: React.CSSProperties = {
  width: "50%",
  color: "red",
};
export const gridStyleForListForm: React.CSSProperties = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
};
export const formItemLayout = {
  labelCol: {
    sm: { span: 1 },
  },
  wrapperCol: {
    sm: { span: 23 },
  },
};

export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: { span: 30, offset: 1 },
  },
};
export const optionTopic = [
  {
    value: "1",
    label: "Not Identified",
    disabled: true,
  },
  {
    value: "2",
    label: "Closed",
  },
  {
    value: "3",
    label: "Communicated",
  },
  {
    value: "4",
    label: "Identified",
  },
  {
    value: "5",
    label: "Resolved",
  },
  {
    value: "6",
    label: "Cancelled",
  },
];
