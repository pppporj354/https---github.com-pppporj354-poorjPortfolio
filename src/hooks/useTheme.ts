import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  )

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return { theme, toggleTheme }
}
