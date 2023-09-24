
import { useSystemStore } from "@/stores/system";
import router from "@/router";
router.beforeEach(async (to, from, next) => {
  const systemStore = useSystemStore();
  if (!systemStore.siteInfo.blogName) {
    await systemStore.update_siteInfo()
  }
  document.title = `${to.meta?.title}-LL's Blog`
  next()
})