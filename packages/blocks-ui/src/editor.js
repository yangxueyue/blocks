/** @jsx jsx */
import { useState, useEffect, useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, jsx } from 'theme-ui'
import { system as systemTheme } from '@theme-ui/presets'

import * as DEFAULT_BLOCKS from '@blocks/react'
import * as themeComponents from '@theme-ui/components'

import * as transforms from './transforms'

import { useEditor } from './providers/editor'
import pragma from './pragma'

import Canvas from './canvas'
import Layout from './layout'
import SidePanel from './side-panel'

const defaultTheme = {
  ...systemTheme,
  breakpoints: [360, 600, 1024]
}

export default ({ layout = 'div' }) => {
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

  return (
    <Layout>
      <Canvas />
      <SidePanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        blocks={blocks}
        theme={theme}
        setTheme={setTheme}
      />
    </Layout>
  )
}
