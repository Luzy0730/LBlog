declare interface BlogItem {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
    color: string;
    icon: string;
  };
  tags: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  description?: string;
  createTime: string;
  updateTime: string;
  top: boolean;
  words: number;
  views: number;
}
