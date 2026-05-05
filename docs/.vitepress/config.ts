import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ttochi's Wiki",
  description: '개인 공부 기록 및 지식 정리',
  lang: 'ko-KR',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CA', link: '/CA/1_parallelism_inst' },
      { text: 'NLP', link: '/NLP/basic01' },
    ],

    sidebar: {
      '/CA/': [
        {
          text: 'Computer Architecture',
          items: [
            { text: 'Instruction Level Parallelism', link: '/CA/1_parallelism_inst' },
            { text: 'Data & Thread Parallelism', link: '/CA/2_parallelism_data_thread' },
            { text: 'Cache Optimization', link: '/CA/3-1_cache_optimization' },
            { text: 'Cache Coherence', link: '/CA/3-2_cache_coherence' },
            { text: 'Main Memory', link: '/CA/4-1.main_memory' },
            { text: 'Main Memory Issues', link: '/CA/4-2.main_memory_issues' },
            { text: 'NPU', link: '/CA/6_npu' },
            { text: 'Large-scale Training', link: '/CA/7_large_scale' },
            { text: 'Midterm', link: '/CA/midterm' },
          ],
        },
      ],
      '/NLP/': [
        {
          text: 'Natural Language Processing',
          items: [
            { text: 'Conventional Language Model', link: '/NLP/basic01' },
            { text: 'Machine Learning 개요', link: '/NLP/basic02' },
            { text: 'Recurrent Neural Networks', link: '/NLP/basic03' },
            { text: 'Word Embedding', link: '/NLP/basic04' },
            { text: 'Transformer', link: '/NLP/basic05' },
          ],
        },
      ],
    },

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
