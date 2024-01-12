export const newsKeys = {
  all: () => ["news-list"] as const,
  content: (id: string) => [...newsKeys.all(), "list", id] as const,
};
