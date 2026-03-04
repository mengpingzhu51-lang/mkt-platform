<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { Fold, Expand, ArrowRight, ArrowDown } from '@element-plus/icons-vue'
import { useAppStore } from '../stores/app'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { currentGroup, sidebarCollapsed, topGroups, activeMenu, expandedKeys } = storeToRefs(appStore)

const breadcrumbs = computed(() => {
  if (route.path === '/index') {
    return ['首页']
  }

  const labels = [String(route.meta.moduleTitle ?? currentGroup.value)]
  if (route.meta.parentBranchTitle) labels.push(String(route.meta.parentBranchTitle))
  if (route.meta.branchTitle) labels.push(String(route.meta.branchTitle))
  if (route.meta.title) labels.push(String(route.meta.title))
  return labels
})

watch(
  () => route.path,
  (path) => {
    const matched = topGroups.value
      .filter((group) => path === group.basePath || path.startsWith(`${group.basePath}/`))
      .sort((a, b) => b.basePath.length - a.basePath.length)[0]
    if (matched) {
      appStore.setGroup(matched.title, false)
      appStore.syncExpandedByPath(path)
    }
  },
  { immediate: true }
)

function switchGroup(title: string) {
  appStore.setGroup(title, true)
  const target = topGroups.value.find((group) => group.title === title)
  if (target) {
    const first = target.entries[0]?.children?.[0]?.path ?? target.entries[0]?.path ?? '/index'
    void router.push(first)
  }
}

function isExpanded(key: string) {
  return expandedKeys.value.includes(key)
}

function onLevel1Click(key: string, exclusive = false) {
  if (exclusive) {
    const level1Keys = activeMenu.value.entries.map((entry) => entry.key)
    const current = isExpanded(key)
    expandedKeys.value = expandedKeys.value.filter((item) => !level1Keys.includes(item))
    if (!current) expandedKeys.value.push(key)
    return
  }
  appStore.toggleExpand(key)
}

function onEntryClick(path: string) {
  void router.push(path)
}

function notifySoon() {
  ElMessage.info('该模块将按审计清单逐步复刻。')
}
</script>

<template>
  <div class="platform-shell">
    <header class="shell-header">
      <div class="brand">营销管理系统</div>
      <div class="group-switch">
        <button
          v-for="group in topGroups"
          :key="group.title"
          class="group-button"
          :class="{ active: group.title === currentGroup }"
          @click="switchGroup(group.title)"
        >
          {{ group.title }}
        </button>
      </div>
      <div class="header-actions">
        <button class="ghost-btn" @click="notifySoon">审计对照</button>
      </div>
    </header>

    <div class="shell-body">
      <aside class="shell-sidebar" :class="{ collapsed: sidebarCollapsed }">
        <div class="sidebar-head">
          <span class="sidebar-title">{{ activeMenu.title }}</span>
          <el-button :icon="sidebarCollapsed ? Expand : Fold" circle text @click="appStore.toggleSidebar" />
        </div>

        <nav class="menu-list">
          <div v-for="item in activeMenu.entries" :key="item.title" class="menu-group">
            <button
              class="menu-item level-1"
              :class="{ expanded: isExpanded(item.key) }"
              @click="onLevel1Click(item.key, true)"
            >
              <span>{{ item.title }}</span>
              <el-icon class="arrow" :class="{ rotate: isExpanded(item.key) }"><ArrowDown /></el-icon>
            </button>

            <div v-if="isExpanded(item.key)" class="menu-sub-list level-2-list">
              <template v-for="child in item.children ?? []" :key="child.path">
                <button
                  v-if="!child.children || child.children.length === 0"
                  class="menu-sub-item level-2-leaf"
                  :class="{ active: route.path === child.path }"
                  @click="onEntryClick(child.path)"
                >
                  {{ child.title }}
                </button>

                <button
                  v-else
                  class="menu-sub-item level-2-parent"
                  :class="{ expanded: isExpanded(child.key) }"
                  @click="onLevel1Click(child.key)"
                >
                  <span>{{ child.title }}</span>
                  <el-icon class="arrow" :class="{ rotate: isExpanded(child.key) }"><ArrowDown /></el-icon>
                </button>

                <div v-if="child.children && isExpanded(child.key)" class="menu-sub-list level-3-list">
                  <button
                    v-for="sub in child.children"
                    :key="sub.path"
                    class="menu-sub-item level-3-leaf"
                    :class="{ active: route.path === sub.path }"
                    @click="onEntryClick(sub.path)"
                  >
                    {{ sub.title }}
                  </button>
                </div>
              </template>
            </div>

          </div>
        </nav>
      </aside>

      <main class="shell-main">
        <div class="shell-breadcrumb">
          <span v-for="(item, index) in breadcrumbs" :key="item">
            <span>{{ item }}</span>
            <el-icon v-if="index < breadcrumbs.length - 1"><ArrowRight /></el-icon>
          </span>
        </div>
        <router-view />
      </main>
    </div>
  </div>
</template>
