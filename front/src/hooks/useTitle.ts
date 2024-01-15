import { useTitle } from '@vueuse/core'
import { useSystemStore } from "@/stores/system";

export default function (title: string) {
  const systemStore = useSystemStore();
  useTitle(title, { titleTemplate: `%s | ${systemStore.siteInfo.blogName}` })
}