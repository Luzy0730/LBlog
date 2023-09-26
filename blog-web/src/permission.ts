import useTitle from '@/hooks/useTitle'
import { storeToRefs } from 'pinia'
import { useSystemStore, useUserStore } from "@/stores/index";
import router from "@/router";
router.beforeEach((to, from, next) => {
  const systemStore = useSystemStore();
  const useStore = useUserStore();
  if (!systemStore.siteInfo.blogName) {
    systemStore.update_siteInfo()
  }
  if (!useStore.introduction.name) {
    useStore.update_introduction()
  }
  useTitle(to.meta.title as string)
  next()
})