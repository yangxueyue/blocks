import React from 'react'

import Providers from './providers'
import Editor from './editor'

import appTheme from './theme'

export default ({
  src: initialCode,
  blocks: providedBlocks,
  theme = {},
  props = {},
  layout = 'div',
  onChange
}) => (
  <Providers
    initialCode={initialCode}
    theme={theme}
    appTheme={appTheme}
    scope={{
      ...providedBlocks,
      props,
      layout
    }}
  >
    <Editor onChange={onChange} />
  </Providers>
)
