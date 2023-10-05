import type { StyleValue } from "vue";

export interface TocItem {
  level: number;
  title: string | null;
  style: any;
  children: TocItem[];
  element: Element;
}

export type State = () => {
  tocList: TocItem[],
  tocLevel: number[]
};
