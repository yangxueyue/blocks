import React, { useContext } from 'react'

const ScopeContext = React.createContext({})

export const useScope = () => {
  const scope = useContext(ScopeContext)
  return scope
}

export const ScopeProvider = ScopeContext.Provider

export default ({ scope, children }) => (
  <ScopeContext.Provider value={scope}>{children}</ScopeContext.Provider>
)
