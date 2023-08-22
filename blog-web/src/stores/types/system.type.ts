export interface ClientSize {
  clientHeight: number;
  clientWidth: number;
}

export type State = () => {
  clientSize: ClientSize;
  siteInfo: {
    blogName: string;
  };
  mobileHide: boolean;
};
