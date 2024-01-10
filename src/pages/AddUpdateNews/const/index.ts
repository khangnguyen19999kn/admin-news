import { ETopic } from "@/pages/ListNews/const";
import { mapNameTopicToSlug } from "@/pages/ListNews/const/map";

export const gridStyleForInput: React.CSSProperties = {
  width: "70%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const gridStyleForNote: React.CSSProperties = {
  width: "30%",
  color: "red",
};
export const gridStyleForListForm: React.CSSProperties = {
  width: "70%",
  display: "flex",
  flexDirection: "column",
};
export const formItemLayout = {
  labelCol: {
    sm: { span: 2 },
  },
  wrapperCol: {
    sm: { span: 24 },
  },
};

export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: { span: 30, offset: 2 },
  },
};
export const optionTopic = [
  {
    value: mapNameTopicToSlug[ETopic.SPORT],
    label: ETopic.SPORT,
  },
  {
    value: mapNameTopicToSlug[ETopic.ENTERTAINMENT],
    label: ETopic.ENTERTAINMENT,
  },
  {
    value: mapNameTopicToSlug[ETopic.EDUCATION],
    label: ETopic.EDUCATION,
  },
  {
    value: mapNameTopicToSlug[ETopic.SCIENCE],
    label: ETopic.SCIENCE,
  },
  {
    value: mapNameTopicToSlug[ETopic.TECHNOLOGY],
    label: ETopic.TECHNOLOGY,
  },
  {
    value: mapNameTopicToSlug[ETopic.ECONOMY],
    label: ETopic.ECONOMY,
  },
  {
    value: mapNameTopicToSlug[ETopic.POLITICS],
    label: ETopic.POLITICS,
  },
  {
    value: mapNameTopicToSlug[ETopic.WORLD],
    label: ETopic.WORLD,
  },
  {
    value: mapNameTopicToSlug[ETopic.LAW],
    label: ETopic.LAW,
  },
  {
    value: mapNameTopicToSlug[ETopic.HEALTH],
    label: ETopic.HEALTH,
  },
  {
    value: mapNameTopicToSlug[ETopic.CULTURE],
    label: ETopic.CULTURE,
  },
  {
    value: mapNameTopicToSlug[ETopic.LIFE],
    label: ETopic.LIFE,
  },
  {
    value: mapNameTopicToSlug[ETopic.TRAVEL],
    label: ETopic.TRAVEL,
  },
  {
    value: mapNameTopicToSlug[ETopic.FASHION],
    label: ETopic.FASHION,
  },
  {
    value: mapNameTopicToSlug[ETopic.FOOD],
    label: ETopic.FOOD,
  },
  {
    value: mapNameTopicToSlug[ETopic.CAR],
    label: ETopic.CAR,
  },
  {
    value: mapNameTopicToSlug[ETopic.MOVIE],
    label: ETopic.MOVIE,
  },
  {
    value: mapNameTopicToSlug[ETopic.MUSIC],
    label: ETopic.MUSIC,
  },
  {
    value: mapNameTopicToSlug[ETopic.BOOK],
    label: ETopic.BOOK,
  },
];
