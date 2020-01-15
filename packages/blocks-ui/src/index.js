import React from 'react'

import Providers from './providers'
import Editor from './editor'

import appTheme from './theme'

export default ({
  src,
  blocks,
  theme = {},
  props = {},
  scope = {},
  layout = 'div',
  onChange
}) => (
  <Providers
    initialCode={src}
    blocks={blocks}
    theme={theme}
    appTheme={appTheme}
    scope={{
      ...scope,
      props,
      layout
    }}
  >
    <Editor onChange={onChange} />
  </Providers>
)
