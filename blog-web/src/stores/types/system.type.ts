export interface ClientSize {
  clientHeight: number;
  clientWidth: number;
}

export interface SiteInfo {
  ico: string;
  blogName: string;
  copyright: {
    title: string;
    siteName: string;
  };
  beian: string;
}

export type State = () => {
  clientSize: ClientSize;
  siteInfo: SiteInfo;
  mobileHide: boolean;
};
