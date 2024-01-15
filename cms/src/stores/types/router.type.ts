import { type RouteRecordNormalized } from 'vue-router'
export type State = () => {
  fullRoutes: Array<RouteRecordNormalized>;
  menuRoutes: Array<RouteRecordNormalized>;
  currentRoutePath: string;
};
