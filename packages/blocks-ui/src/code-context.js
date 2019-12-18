import React, { useState, useContext, useEffect } from 'react'

import * as queries from './queries'
import * as transforms from './transforms'

const CodeContext = React.createContext({})

export const useCode = () => {
  const value = useContext(CodeContext)

  return value
}

export const CodeProvider = ({ children, initialCode }) => {
  const codeWithUuids = transforms.addTuid(initialCode)
  const [codeState, setCodeState] = useState({
    currentElementId: null,
    currentElementData: null,
    rawCode: initialCode,
    code: codeWithUuids,
    transformedCode: transforms.toTransformedJSX(codeWithUuids),
    blocks: queries.getBlocks(codeWithUuids)
  })

  const updateCode = newCode => {
    return {
      code: newCode,
      transformedCode: transforms.toTransformedJSX(newCode),
      blocks: queries.getBlocks(newCode)
    }
  }

  const setCurrentElementId = elementId => {
    if (!elementId) {
      return setCodeState({
        ...codeState,
        currentElementId: null,
        currentElementData: null
      })
    }

    const currentElementData = queries.getCurrentElement(
      codeState.code,
      elementId
    )

    setCodeState({
      ...codeState,
      currentElementId: elementId,
      currentElementData
    })
  }

  const selectParentofCurrentElement = () => {
    if (codeState.currentElementData.parentId) {
      setCurrentElementId(codeState.currentElementData.parentId)
    } else {
      setCurrentElementId(null)
    }
  }

  const cloneCurrentElement = () => {
    console.log('hiiiiiiiiiiiiiiii')
    const { code } = transforms.cloneElement(codeState.code, {
      elementId: codeState.currentElementId
    })

    setCodeState({
      ...codeState,
      ...updateCode(code)
    })
  }

  const removeCurrentElement = () => {
    const { code } = transforms.removeElement(codeState.code, {
      elementId: codeState.currentElementId
    })

    const newCodeState = updateCode(code)
    const currentElementId = codeState.currentElementData.parentId
    setCodeState({
      ...codeState,
      ...newCodeState,
      currentElementId,
      currentElementData: queries.getCurrentElement(
        codeState.code,
        currentElementId
      )
    })
  }

  return (
    <CodeContext.Provider
      value={{
        ...codeState,
        setCurrentElementId,
        removeCurrentElement,
        cloneCurrentElement,
        selectParentofCurrentElement
      }}
    >
      {children}
    </CodeContext.Provider>
  )
}

export default CodeProvider
