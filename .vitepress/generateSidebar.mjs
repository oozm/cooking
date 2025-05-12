// docs/.vitepress/generateGuideSidebar.mjs
import fs from 'fs'
import path from 'path'

/**
 * @description 递归获取目录下所有 .md 文件
 * @param {string} dir
 * @param {string[]} list
 */
function walkMd(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      walkMd(full, list)
    } else if (e.isFile() && e.name.endsWith('.md')) {
      list.push(full)
    }
  }
  return list
}

/**
 * @description 创建侧边栏配置
 * @param {string} baseDir 相对 docs 的子目录，如 'guide'
 * @param {Record<string,{name:string,order:number}>} groupMeta 自定义映射
 */
export function createGuideSidebar(
  baseDir = 'guide',
  groupMeta = {
    // 在这里维护你的映射：
    learn: { name: '简介', order: 0 },
    starsystem: { name: '难度索引', order: 1 },
    vegetable_dish: { name: '素菜', order: 2 },
    meat_dish: { name: '荤菜', order: 3 },
    aquatic: { name: '水产', order: 4 },
    breakfast: { name: '早餐', order: 5 },
    staple: { name: '主食', order: 6 },
    semi_finished: { name: '半成品', order: 7 },
    soup: { name: '汤与粥', order: 7 },
    drink: { name: '饮料', order: 8 },
    condiment: { name: '酱料和其它材料', order: 9 },
    dessert: { name: '甜品', order: 10 },
    advanced: { name: '进阶知识学习', order: 11 },
  }
) {
  const docsRoot = path.resolve(__dirname, '..')
  const guideRoot = path.join(docsRoot, baseDir)

  // 1. 读取一级目录
  const dirs = fs
    .readdirSync(guideRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  // 2. 构造带 meta 的分组数组
  const groups = dirs.map((dirName) => {
    const meta = groupMeta[dirName] || {
      name: dirName,
      order: Number.MAX_SAFE_INTEGER,
    }
    return { dirName, displayName: meta.name, order: meta.order }
  })

  // 3. 按 order 排序
  groups.sort((a, b) => a.order - b.order)

  // 4. 对每个分组，递归收集 .md 并生成 items
  const sidebar = groups.map((group) => {
    const groupDir = path.join(guideRoot, group.dirName)
    const mdFiles = walkMd(groupDir)

    // 对文件排序（可按需改）
    mdFiles.sort((a, b) => a.localeCompare(b, 'zh'))

    const items = mdFiles.map((absPath, idx) => {
      const rel = path.relative(docsRoot, absPath).replace(/\\/g, '/')
      return {
        text: `${idx + 1}. ${path.basename(absPath, '.md')}`,
        link: `/${rel.replace(/\.md$/, '')}`,
      }
    })

    return {
      text: group.displayName,
      collapsed: group.order === 0 ? false : true,
      items,
    }
  })

  return sidebar
}
