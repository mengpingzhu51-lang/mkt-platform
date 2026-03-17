import type { RouteRecordRaw } from 'vue-router'
import { flatPlatformLeaves, platformStructure } from '../../config/platform-structure'

function resolveLeafComponent(path: string) {
  if (path === '/customer/tenantConfig') {
    return () => import('../../views/customer/SubjectManagementView.vue')
  }
  return () => import('../../views/common/ModulePlaceholder.vue')
}

function childPathFromAbsolute(basePath: string, absolutePath: string) {
  const base = `${basePath}/`
  if (!absolutePath.startsWith(base)) {
    return absolutePath.replace(/^\//, '')
  }
  return absolutePath.slice(base.length)
}

const platformModules: RouteRecordRaw[] = platformStructure.map((module) => {
  const moduleLeaves = flatPlatformLeaves.filter((leaf) => leaf.basePath === module.basePath)

  return {
    path: module.basePath.replace(/^\//, ''),
    name: `module-${module.basePath.replace('/', '')}`,
    meta: { title: module.title },
    children: moduleLeaves.map((leaf) => ({
      path: childPathFromAbsolute(module.basePath, leaf.path),
      name: leaf.path.replace(/[^\w]/g, '-').replace(/^-+/, ''),
      component: resolveLeafComponent(leaf.path),
      meta: {
        title: leaf.title,
        moduleTitle: leaf.moduleTitle,
        branchTitle: leaf.branchTitle,
        parentBranchTitle: leaf.parentBranchTitle,
        pageType: leaf.pageType,
        actions: leaf.actions
      }
    }))
  }
})

export default platformModules
