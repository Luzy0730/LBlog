<template>
  <div class="border border-slate-200 p-3 overflow-y-auto" style="height: calc(100vh - 160px);">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
