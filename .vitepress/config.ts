import {
  defineConfig,
} from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'

import llmstxt from 'vitepress-plugin-llms'
import { createGuideSidebar } from "./generateSidebar.mjs";

const prod = !!process.env.NETLIFY

export default defineConfig({
  title: 'Cooking',
  base: '/cooking/',
  rewrites: {
    'en/:rest*': ':rest*'
  },
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="复制代码" class="copy"></button>`
        )
      }
      md.use(groupIconMdPlugin)
    }
  },

  sitemap: {
    hostname: 'uilist.com',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cooking' }],
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-PHBYJQ1PE1', async: '' }],
    ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-PHBYJQ1PE1', { anonymize_ip: true });
  `]
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/learn/厨房准备' },
      { text: '免责声明', link: '/disclaimer' }
    ],
    sidebar: createGuideSidebar(),
    footer: {
      message: '食品安全请自主管理，本站不承担烹饪风险责任。',
      copyright: '© 2025 Cooking 食谱站 版权所有'
    },
    logo: { src: '/logo-mini.png', width: 24, height: 24 },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oozm/cooking', ariaLabel: 'GitHub' },
    ],
    // carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' },
  },


  vite: {
    assetsInclude: [/\.(jpe?g|png|gif|svg)$/i],
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(
            import.meta.url,
            '../public/logo-mini.png'
          ),
          firebase: 'logos:firebase'
        }
      }),
      prod &&
      llmstxt({
        workDir: 'en',
        ignoreFiles: ['index.md']
      })
    ],
    build: {
      // 将警告阈值调到 1000 KB（默认为 500）
      chunkSizeWarningLimit: 1000,
    }
  },

})
