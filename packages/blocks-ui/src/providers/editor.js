import React, { useState, useContext } from 'react'

const EDITOR_TAB_INDEX = 0
const COMPONENTS_TAB_INDEX = 1
const THEME_TAB_INDEX = 2

const TAB_MAP = {
  [EDITOR_TAB_INDEX]: 'editor',
  [COMPONENTS_TAB_INDEX]: 'components',
  [THEME_TAB_INDEX]: 'theme'
}

const EditorContext = React.createContext(null)

export const useEditor = () => {
  const value = useContext(EditorContext)

  return value
}

export const EditorProvider = ({ children }) => {
  const [value, update] = useState({
    activeTabIndex: EDITOR_TAB_INDEX,
    activeTab: 'editor',
    mode: 'canvas'
  })

  return (
    <EditorContext.Provider
      value={{
        ...value,
        update,
        updateActiveTab: newTabIndex => {
          console.log(newTabIndex)
          update({
            ...value,
            activeTab: TAB_MAP[newTabIndex],
            activeTabIndex: newTabIndex
          })
        }
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export default EditorProvider
