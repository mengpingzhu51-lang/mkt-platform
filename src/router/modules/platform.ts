import type { RouteRecordRaw } from 'vue-router'
import { flatPlatformLeaves, platformStructure } from '../../config/platform-structure'

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
      component: () => import('../../views/common/ModulePlaceholder.vue'),
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
