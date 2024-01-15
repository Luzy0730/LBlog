import useTitle from '@/hooks/useTitle'
import { storeToRefs } from 'pinia'
import { useSystemStore, useUserStore } from "@/stores/index";
import router from "@/router";
router.beforeEach(async (to, from, next) => {
  const systemStore = useSystemStore();
  const useStore = useUserStore();
  if (!useStore.introduction.name) {
    useStore.update_introduction()
  }
  if (!systemStore.siteInfo.blogName) {
    await systemStore.update_siteInfo()
  }
  useTitle(to.meta.title as string)
  next()
})