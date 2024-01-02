export type TNews = {
  id: string;
  title: string;
  slug: string;
  description: string;
  topic: string;
  content: string;
  author: string;
  tags: string[];
  bannerImg: string;
  createdAt: string;
  viewCount: number;
};
export type TTemplateDate = "add" | "edit";
