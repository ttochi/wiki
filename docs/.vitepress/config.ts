import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

const CATEGORY_NAMES: Record<string, string> = {
  CA: 'Computer Architecture',
  NLP: 'Natural Language Processing',
}

function getTitle(filePath: string, fileName: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const fmTitle = content.match(/^---\n[\s\S]*?^title:\s*(.+)$/m)
    if (fmTitle) return fmTitle[1].trim()
    const h1 = content.match(/^#\s+(.+)$/m)
    if (h1) return h1[1].trim()
  } catch {}
  return fileName.replace(/\.md$/, '').replace(/[-_.]/g, ' ')
}

function getSidebarItems(category: string) {
  const dir = resolve(__dirname, '..', category)
  try {
    return readdirSync(dir)
      .filter(f => f.endsWith('.md') && f !== 'index.md')
      .sort()
      .map(file => ({
        text: getTitle(resolve(dir, file), file),
        link: `/${category}/${file.replace(/\.md$/, '')}`,
      }))
  } catch {
    return []
  }
}

function buildSidebar() {
  return Object.fromEntries(
    Object.keys(CATEGORY_NAMES).map(cat => [
      `/${cat}/`,
      [{ text: CATEGORY_NAMES[cat], items: getSidebarItems(cat) }],
    ])
  )
}

export default defineConfig({
  title: "ttochi's Wiki",
  description: '개인 공부 기록 및 지식 정리',
  lang: 'ko-KR',
  base: '/wiki/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      ...Object.entries(CATEGORY_NAMES).map(([cat, name]) => ({
        text: name.split(' ')[0],
        link: `/${cat}/`,
      })),
    ],

    sidebar: buildSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ttochi' },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      label: '목차',
      level: [2, 3],
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },
  },
})
