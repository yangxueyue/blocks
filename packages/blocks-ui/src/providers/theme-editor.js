import React, { useState, useContext } from 'react'

const ThemeEditorContext = React.createContext({})

export const useThemeEditor = () => {
  const value = useContext(ThemeEditorContext)

  return value
}

export const ThemeEditorProvider = ({ theme = {}, children }) => {
  const [value, update] = useState(theme)

  return (
    <ThemeEditorContext.Provider value={{ ...value, update }}>
      {children}
    </ThemeEditorContext.Provider>
  )
}

export default ThemeEditorProvider
