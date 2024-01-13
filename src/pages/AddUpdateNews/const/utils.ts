import { TNews } from "@/pages/ListNews/types";
import { initialValues } from ".";
import { TFormAddNews } from "../types";

export const convertNewsToFormNews = (news?: TNews): TFormAddNews => {
  if (!news) return initialValues;
  return {
    title: news.title,
    content: news.content,
    author: news.author,
    topic: news.topic,
    bannerImg: news.bannerImg,
    tags: news.tags,
    description: news.description,
  };
};
