/** @jsx jsx */
import { useState, useEffect, useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, jsx } from 'theme-ui'
import { system as systemTheme } from '@theme-ui/presets'

import * as DEFAULT_BLOCKS from '@blocks/react'
import * as themeComponents from '@theme-ui/components'

import * as transforms from './transforms'
import * as queries from './queries'

import { useEditor } from './editor-context'
import CodeProvider from './code-context'
import pragma from './pragma'

import Header from './header'
import Canvas from './canvas'
import Layout from './layout'
import SidePanel from './side-panel'
import appTheme from './theme'

const BLOCKS_Droppable = props => {
  const { mode } = useEditor()
  console.log('rendering droppable')
  return <Droppable isDropDisabled={mode === 'viewports'} {...props} />
}

const BLOCKS_Draggable = ({ active, children, ...props }) => {
  const { mode } = useEditor()

  return (
    <Draggable isDragDisabled={mode === 'viewports'} {...props}>
      {(provided, snapshot) =>
        children(
          {
            ...provided,
            draggableProps: {
              ...provided.draggableProps,
              css: {
                boxShadow: active ? 'inset 0px 0px 0px 2px #0079FF' : undefined,
                ':hover': { boxShadow: 'inset 0px 0px 0px 2px #bbbbbb' },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'inset 0px 0px 0px 1px #4d9ef7'
                }
              }
            }
          },
          snapshot
        )
      }
    </Draggable>
  )
}

const BLOCKS_DroppableInner = props => <div {...props} />
const BLOCKS_DraggableInner = props => <div {...props} />

const defaultTheme = {
  ...systemTheme,
  breakpoints: [360, 600, 1024]
}

export default ({
  src: initialCode,
  blocks: providedBlocks,
  onChange,
  layout = 'div'
}) => {
  const [code, setCode] = useState(null)
  const [elementId, setElementId] = useState(null)
  const [elementData, setElementData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [theme, setTheme] = useState(defaultTheme)

  const blocks = providedBlocks ? providedBlocks : DEFAULT_BLOCKS

  const scope = {
    Blocks: DEFAULT_BLOCKS.Blocks,
    Styled,
    Link: Styled.a,
    jsx: pragma,
    BLOCKS_Droppable,
    BLOCKS_Draggable,
    BLOCKS_DraggableInner,
    BLOCKS_DroppableInner,
    ...themeComponents,
    ...blocks,
    BLOCKS_Layout: layout
  }

  const onDragEnd = drag => {
    if (!drag.destination || drag.destination.droppableId === 'components') {
      return
    }

    if (
      drag.destination === 'root' &&
      drag.source.index === drag.destination.index
    ) {
      return
    }

    if (drag.source.droppableId === 'components') {
      const newCode = transforms.insertJSXBlock(code, { ...drag, blocks })
      setCode(newCode)
    } else if (drag.source.droppableId.startsWith('element-')) {
      console.log(drag)
    } else {
      const newCode = transforms.reorderJSXBlocks(code, drag)
      setCode(newCode)
    }
  }

  const onBeforeDragStart = drag => {
    setElementId(drag.draggableId)
  }

  const handleRemove = key => () => {
    const sx = elementData.props.sx || {}
    delete sx[key]

    setElementData({ ...elementData, props: { ...elementData.props, sx } })

    const { code: newCode } = transforms.removeSxProp(code, { elementId, key })
    setCode(newCode)
  }

  const handleRemoveElement = () => {
    const { code: newCode } = transforms.removeElement(code, { elementId })
    setCode(newCode)
    if (elementData.parentId) {
      setElementId(elementData.parentId)
    } else {
      setElementId(null)
    }
    setElementData(null)
  }

  const handleClone = () => {
    const { code: newCode } = transforms.cloneElement(code, { elementId })
    setCode(newCode)
  }

  const handleInsertElement = () => {
    const { code: newCode } = transforms.insertElementAfter(code, { elementId })
    setCode(newCode)
  }

  const handleTextUpdate = e => {
    const text = e.target.value
    setElementData({ ...elementData, text })

    const { code: newCode } = transforms.replaceText(code, { text, elementId })
    setCode(newCode)
  }

  const handleChange = newSx => {
    const sx = elementData.props.sx || {}

    setElementData({
      ...elementData,
      props: { ...elementData.props, sx: { ...sx, ...newSx } }
    })

    const { code: newCode } = transforms.applySxProp(code, {
      elementId,
      sx: newSx
    })

    setCode(newCode)
  }

  const handleParentSelect = () => {
    if (elementData.parentId) {
      setElementId(elementData.parentId)
    } else {
      setElementId(null)
      setElementData(null)
    }
  }

  const handlePropChange = key => e => {
    setElementData({
      ...elementData,
      props: { ...elementData.props, [key]: e.target.value }
    })

    const { code: newCode } = transforms.applyProp(code, {
      elementId,
      key,
      value: e.target.value
    })

    setCode(newCode)
  }

  return (
    <CodeProvider initialCode={initialCode}>
      <Layout elementData={elementData} theme={appTheme}>
        <Header />
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={onBeforeDragStart}
        >
          <div
            sx={{
              display: 'flex',
              height: 'calc(100vh - 43px)'
            }}
          >
            <Canvas scope={scope} theme={theme} />
            <SidePanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              blocks={blocks}
              theme={theme}
              setTheme={setTheme}
              handleChange={handleChange}
              handlePropChange={handlePropChange}
              handleRemove={handleRemove}
              handleRemoveElement={handleRemoveElement}
              handleParentSelect={handleParentSelect}
              handleInsertElement={handleInsertElement}
              handleClone={handleClone}
              handleTextUpdate={handleTextUpdate}
            />
          </div>
        </DragDropContext>
      </Layout>
    </CodeProvider>
  )
}
