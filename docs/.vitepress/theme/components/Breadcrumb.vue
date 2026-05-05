<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, theme } = useData()

const CATEGORY_NAMES: Record<string, string> = {
  CA: 'Computer Architecture',
  NLP: 'Natural Language Processing',
}

const breadcrumbs = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  const parts = path.split('/')

  if (parts.length < 2 || parts[0] === 'index') return []

  const category = parts[0]
  const items = [
    { text: 'Home', link: '/' },
    { text: CATEGORY_NAMES[category] ?? category, link: `/${category}/` },
  ]

  if (parts.length > 1 && parts[1] !== 'index') {
    items.push({ text: page.value.title, link: null })
  }

  return items
})
</script>

<template>
  <nav v-if="breadcrumbs.length" class="breadcrumb" aria-label="breadcrumb">
    <template v-for="(item, i) in breadcrumbs" :key="i">
      <span v-if="i > 0" class="separator">›</span>
      <a v-if="item.link" :href="item.link">{{ item.text }}</a>
      <span v-else class="current">{{ item.text }}</span>
    </template>
  </nav>
</template>
