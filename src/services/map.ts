import { ETopic } from "@/pages/ListNews/const";
import { EPath } from "@/services/enum";

export const mapPathnameToKey = {
  [EPath.LIST_NEWS]: "1",
  [EPath.LIST_USER]: "2",
  [EPath.LIST_REPORT]: "3",
};
export const mapPathToLabel = {
  [EPath.LIST_NEWS]: "List News",
  [EPath.LIST_USER]: "List User",
  [EPath.LIST_REPORT]: "List Report",
};
export const mapNameTopicToSlug: Record<ETopic, string> = {
  [ETopic.SOCIETY]: "xa-hoi",
  [ETopic.SPORT]: "the-thao",
  [ETopic.ENTERTAINMENT]: "giai-tri",
  [ETopic.EDUCATION]: "giao-duc",
  [ETopic.SCIENCE]: "khoa-hoc",
  [ETopic.TECHNOLOGY]: "cong-nghe",
  [ETopic.ECONOMY]: "kinh-te",
  [ETopic.POLITICS]: "chinh-tri",
  [ETopic.WORLD]: "the-gioi",
  [ETopic.LAW]: "phap-luat",
  [ETopic.HEALTH]: "suc-khoe",
  [ETopic.CULTURE]: "van-hoa",
  [ETopic.LIFE]: "doi-song",
  [ETopic.TRAVEL]: "du-lich",
  [ETopic.FASHION]: "thoi-trang",
  [ETopic.FOOD]: "am-thuc",
  [ETopic.CAR]: "xe",
  [ETopic.MOVIE]: "phim",
  [ETopic.MUSIC]: "nhac",
  [ETopic.BOOK]: "sach",
};
export const mapSlugToNameTopic: Record<string, ETopic> = {
  "xa-hoi": ETopic.SOCIETY,
  "the-thao": ETopic.SPORT,
  "giai-tri": ETopic.ENTERTAINMENT,
  "giao-duc": ETopic.EDUCATION,
  "khoa-hoc": ETopic.SCIENCE,
  "cong-nghe": ETopic.TECHNOLOGY,
  "kinh-te": ETopic.ECONOMY,
  "chinh-tri": ETopic.POLITICS,
  "the-gioi": ETopic.WORLD,
  "phap-luat": ETopic.LAW,
  "suc-khoe": ETopic.HEALTH,
  "van-hoa": ETopic.CULTURE,
  "doi-song": ETopic.LIFE,
  "du-lich": ETopic.TRAVEL,
  "thoi-trang": ETopic.FASHION,
  "am-thuc": ETopic.FOOD,
  xe: ETopic.CAR,
  phim: ETopic.MOVIE,
  nhac: ETopic.MUSIC,
  sach: ETopic.BOOK,
};
