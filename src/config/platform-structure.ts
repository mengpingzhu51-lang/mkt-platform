export interface PlatformLeaf {
  title: string
  path: string
  pageType: '看板' | '列表' | '详情' | '表单' | '流程' | '报表' | '配置'
  actions: string[]
}

export interface PlatformBranch {
  title: string
  leaves?: PlatformLeaf[]
  branches?: PlatformBranch[]
}

export interface PlatformModule {
  title: string
  basePath: string
  branches: PlatformBranch[]
}

export const platformStructure: PlatformModule[] = [
  {
    title: '代运营',
    basePath: '/market',
    branches: [
      {
        title: '投放管理',
        leaves: [
          { title: '投放策略', path: '/market/circlingCrowd/distAndCirc', pageType: '详情', actions: ['筛选', '新增', '编辑', '开启', '停用'] },
          { title: '人群包待办池', path: '/market/circlingCrowd/crowdPack', pageType: '列表', actions: ['筛选', '导出', '查看'] },
          { title: '断点出包', path: '/market/circlingCrowd/breakPoint', pageType: '流程', actions: ['新建任务', '启动', '停止'] }
        ]
      },
      {
        title: '投放配置',
        leaves: [
          { title: '模型配置', path: '/market/channelManage/modelConfig', pageType: '配置', actions: ['新增', '编辑', '启停'] },
          { title: '前筛配置', path: '/market/channelManage/preFilterConfig', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '前筛规则配置', path: '/market/channelManage/preFilterRule', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '过滤规则配置', path: '/market/channelManage/filterRule', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '底包管理', path: '/market/channelManage/originalPackage', pageType: '列表', actions: ['筛选', '导入', '导出'] },
          { title: '任务模板配置', path: '/market/channelManage/marketingTemplates', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '去重配置', path: '/market/channelManage/circleConfig', pageType: '配置', actions: ['新增', '编辑'] }
        ]
      },
      {
        title: '报表中心',
        leaves: [
          { title: '短信报表（通用）', path: '/market/statement/textMessage', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '语音报表（通用）', path: '/market/statement/outbound', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '渠道外呼报表', path: '/market/statement/channelOutbound', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '携程特征报表', path: '/market/statement/xcFateReport', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '存客包营销报表', path: '/market/statement/existingPackResult', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '存客包转化报表', path: '/market/statement/existedTransformed', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '代运营月报表', path: '/market/statement/monthReport', pageType: '报表', actions: ['筛选', '导出'] }
        ]
      },
      {
        title: '运营工具',
        leaves: [
          { title: '黑名单管理', path: '/market/management/blacklist', pageType: '列表', actions: ['筛选', '新增', '导入', '导出'] },
          { title: '个人营销记录查询', path: '/market/management/individualQuery', pageType: '列表', actions: ['筛选', '查询', '导出'] }
        ],
        branches: [
          {
            title: '短链管理',
            leaves: [
              { title: '短链生成', path: '/market/management/shortUrl/generate', pageType: '表单', actions: ['生成', '复制'] },
              { title: '短链查询', path: '/market/management/shortUrl/check', pageType: '列表', actions: ['筛选', '导出'] },
              { title: '短链分配', path: '/market/management/shortUrl/urlAllocation', pageType: '表单', actions: ['分配', '保存'] }
            ]
          }
        ]
      },
      {
        title: '合作方管理',
        leaves: [
          { title: '通道账号列表', path: '/market/partners/accountList', pageType: '列表', actions: ['筛选', '新增', '编辑'] },
          { title: '产品配置', path: '/market/partners/productConfig', pageType: '配置', actions: ['新增', '编辑'] }
        ]
      },
      {
        title: '画像洞察',
        leaves: [{ title: '画像洞察', path: '/market/portrait', pageType: '看板', actions: ['筛选', '导出'] }]
      }
    ]
  },
  {
    title: '营销分',
    basePath: '/score',
    branches: [
      {
        title: '模型与产品',
        leaves: [
          { title: '模型管理', path: '/score/models', pageType: '列表', actions: ['筛选', '新增', '编辑', '启停'] },
          { title: '产品管理', path: '/score/scoreProducts', pageType: '列表', actions: ['筛选', '新增', '编辑'] }
        ]
      },
      {
        title: '客户配置',
        leaves: [
          { title: '客户管理', path: '/score/customers/scoreCustomers', pageType: '列表', actions: ['筛选', '新增'] },
          { title: '数据源管理', path: '/score/customers/scoreDataSource', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '客户产品管理', path: '/score/customers/scoreCPM', pageType: '配置', actions: ['绑定', '解绑'] },
          { title: '计费规则', path: '/score/customers/scorePrice', pageType: '配置', actions: ['新增', '编辑'] }
        ]
      },
      {
        title: '统计报表',
        leaves: [
          { title: '调用统计', path: '/score/statistics/scoreStatistic', pageType: '报表', actions: ['筛选', '导出'] },
          { title: '收入统计', path: '/score/statistics/revenueStatistics', pageType: '报表', actions: ['筛选', '导出'] }
        ]
      }
    ]
  },
  {
    title: '账单管理',
    basePath: '/finance',
    branches: [
      {
        title: '客户侧',
        leaves: [
          { title: '客户侧月详单', path: '/finance/finance/partner/monthDetailBill', pageType: '列表', actions: ['筛选', '导出'] },
          { title: '客户侧总账单', path: '/finance/incomeTotalBill', pageType: '报表', actions: ['筛选', '导出'] }
        ]
      },
      {
        title: '渠道侧',
        leaves: [
          { title: '渠道侧月详单', path: '/finance/monthDetailBillForChannel', pageType: '列表', actions: ['筛选', '导出'] },
          { title: '渠道侧总账单', path: '/finance/monthTotalBillForChannel', pageType: '报表', actions: ['筛选', '导出'] }
        ]
      },
      {
        title: '营销分侧',
        leaves: [{ title: '营销分月账单', path: '/finance/scoreMonthBill', pageType: '报表', actions: ['筛选', '导出'] }]
      }
    ]
  },
  {
    title: '监控中心',
    basePath: '/monitor',
    branches: [
      {
        title: '监控大盘',
        leaves: [
          { title: '代运营监控', path: '/monitor/marketing', pageType: '看板', actions: ['筛选', '查看详情'] },
          { title: '圈包任务监控', path: '/monitor/marketingtools', pageType: '看板', actions: ['筛选', '查看详情'] },
          { title: '模型PSI监控', path: '/monitor/modelPsi', pageType: '看板', actions: ['筛选', '导出'] },
          { title: '营销分监控', path: '/monitor/marketingScore', pageType: '看板', actions: ['筛选', '导出'] }
        ]
      }
    ]
  },
  {
    title: '工具模块',
    basePath: '/marketTool',
    branches: [
      {
        title: '任务工具',
        leaves: [
          { title: '跑批回溯', path: '/marketTool/batchProcessRecall', pageType: '流程', actions: ['筛选', '执行'] },
          { title: '进件跑批（新）', path: '/marketTool/backtrack', pageType: '流程', actions: ['筛选', '执行'] },
          { title: '营销分SFTP管理', path: '/marketTool/taskTool', pageType: '配置', actions: ['上传', '下载', '重试'] }
        ]
      }
    ]
  },
  {
    title: '系统管理',
    basePath: '/system',
    branches: [
      {
        title: '权限与组织',
        leaves: [
          { title: '主体管理', path: '/system/tenantConfig', pageType: '配置', actions: ['新增', '编辑'] },
          { title: '部门管理', path: '/system/dept', pageType: '列表', actions: ['新增', '编辑'] },
          { title: '菜单管理', path: '/system/menu', pageType: '列表', actions: ['新增', '编辑'] },
          { title: '角色管理', path: '/system/role', pageType: '列表', actions: ['新增', '编辑'] },
          { title: '用户管理', path: '/system/user', pageType: '列表', actions: ['筛选', '新增', '禁用'] },
          { title: '产品权限配置', path: '/system/productPermission', pageType: '配置', actions: ['配置', '保存'] },
          { title: '字典管理', path: '/system/dict', pageType: '列表', actions: ['新增', '编辑'] }
        ]
      }
    ]
  }
]

export interface FlatLeaf extends PlatformLeaf {
  moduleTitle: string
  basePath: string
  branchTitle: string
  parentBranchTitle?: string
}

function collectLeaves(
  moduleTitle: string,
  basePath: string,
  branch: PlatformBranch,
  parentBranchTitle?: string
): FlatLeaf[] {
  const current = (branch.leaves ?? []).map((leaf) => ({
    ...leaf,
    moduleTitle,
    basePath,
    branchTitle: branch.title,
    parentBranchTitle
  }))

  const nested = (branch.branches ?? []).flatMap((subBranch) =>
    collectLeaves(moduleTitle, basePath, subBranch, branch.title)
  )

  return [...current, ...nested]
}

export const flatPlatformLeaves: FlatLeaf[] = platformStructure.flatMap((module) =>
  module.branches.flatMap((branch) => collectLeaves(module.title, module.basePath, branch))
)
