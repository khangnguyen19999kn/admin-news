export const newsKeys = {
  all: () => ["news-list"] as const,
  content: (id: number, params: any) => [...newsKeys.all(), "list", id, params] as const,
};
