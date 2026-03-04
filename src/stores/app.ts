import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { platformStructure } from '../config/platform-structure'

export interface MenuEntry {
  key: string
  title: string
  path: string
  children?: MenuEntry[]
}

export interface MenuGroup {
  title: string
  basePath: string
  entries: MenuEntry[]
}

const groups: MenuGroup[] = [
  {
    title: '首页',
    basePath: '/index',
    entries: [
      {
        key: 'home-group',
        title: '首页',
        path: '/index',
        children: [{ key: 'home-dashboard', title: '工作台看板', path: '/index' }]
      }
    ]
  },
  ...platformStructure.map((module) => ({
    title: module.title,
    basePath: module.basePath,
    entries: module.branches.map((branch, index) => {
      const groupKey = `${module.basePath}-branch-${index}`
      return {
        key: groupKey,
        title: branch.title,
        path: branch.leaves?.[0]?.path ?? branch.branches?.[0]?.leaves?.[0]?.path ?? module.basePath,
        children: [
          ...(branch.leaves ?? []).map((leaf, leafIndex) => ({
            key: `${groupKey}-leaf-${leafIndex}`,
            title: leaf.title,
            path: leaf.path
          })),
          ...(branch.branches ?? []).map((childBranch, childIndex) => ({
            key: `${groupKey}-child-${childIndex}`,
            title: childBranch.title,
            path: childBranch.leaves?.[0]?.path ?? module.basePath,
            children: (childBranch.leaves ?? []).map((leaf, leafIndex) => ({
              key: `${groupKey}-child-${childIndex}-leaf-${leafIndex}`,
              title: leaf.title,
              path: leaf.path
            }))
          }))
        ]
      }
    })
  }))
]

const defaultGroup: MenuGroup = {
  title: '首页',
  basePath: '/index',
  entries: [
    {
      key: 'home-group',
      title: '首页',
      path: '/index',
      children: [{ key: 'home-dashboard', title: '工作台看板', path: '/index' }]
    }
  ]
}

export const useAppStore = defineStore('app', () => {
  const currentGroup = ref('首页')
  const sidebarCollapsed = ref(false)
  const expandedKeys = ref<string[]>([])

  const topGroups = computed(() => groups)
  const activeMenu = computed<MenuGroup>(
    () => groups.find((item) => item.title === currentGroup.value) ?? groups[0] ?? defaultGroup
  )

  function setGroup(title: string, resetExpanded = false) {
    currentGroup.value = title
    if (resetExpanded) {
      const group = groups.find((item) => item.title === title)
      expandedKeys.value = group?.entries[0] ? [group.entries[0].key] : []
    }
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleExpand(key: string) {
    if (expandedKeys.value.includes(key)) {
      expandedKeys.value = expandedKeys.value.filter((item) => item !== key)
      return
    }
    expandedKeys.value = [...expandedKeys.value, key]
  }

  function isLeaf(entry: MenuEntry) {
    return !entry.children || entry.children.length === 0
  }

  function syncExpandedByPath(path: string) {
    const group = groups.find(
      (item) => path === item.basePath || path.startsWith(`${item.basePath}/`)
    )
    if (!group) return

    const matchedKeys: string[] = []
    for (const entry of group.entries) {
      let hit = false

      if (entry.children) {
        for (const child of entry.children) {
          if (child.path === path) {
            matchedKeys.push(entry.key)
            hit = true
            break
          }

          if (child.children?.some((leaf) => leaf.path === path)) {
            matchedKeys.push(entry.key, child.key)
            hit = true
            break
          }
        }
      }

      if (hit) break
    }

    if (matchedKeys.length > 0) {
      expandedKeys.value = Array.from(new Set(matchedKeys))
    }
  }

  if (expandedKeys.value.length === 0) {
    expandedKeys.value = [groups[0]?.entries[0]?.key ?? 'home-group']
  }

  return {
    currentGroup,
    sidebarCollapsed,
    expandedKeys,
    topGroups,
    activeMenu,
    setGroup,
    toggleSidebar,
    toggleExpand,
    isLeaf,
    syncExpandedByPath
  }
})
