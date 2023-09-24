import useTitle from '@/hooks/useTitle'
import { useSystemStore } from "@/stores/system";
import router from "@/router";
router.beforeEach(async (to, from, next) => {
  const systemStore = useSystemStore();
  if (!systemStore.siteInfo.blogName) {
    await systemStore.update_siteInfo()
  }
  useTitle(to.meta.title as string)
  next()
})