import { ref, type Ref } from 'vue'

export function useDarkMode() {
  const isDark: Ref<boolean> = ref(true)

  const initDarkMode = (): void => {
    // 检测系统主题偏好
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
      isDark.value = true
    } else {
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
  }

  const toggleDarkMode = (): void => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDark,
    toggleDarkMode,
    initDarkMode,
  }
}

