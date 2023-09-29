import { useTitle } from '@vueuse/core'

export default function (title: string) {
  useTitle(title, { titleTemplate: `%s | 博客后台` })
}