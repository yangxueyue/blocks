import React from 'react'
import { ThemeProvider } from 'theme-ui'

import CodeProvider from './code'
import EditorProvider from './editor'
import ThemeEditorProvider from './theme-editor'
import ElementProvider from './element'
import ScopeProvider from './scope'
import BlocksProvider from './blocks'

export default ({ initialCode, blocks, scope, children, theme, appTheme }) => (
  <ThemeProvider theme={appTheme}>
    <EditorProvider>
      <ElementProvider>
        <ThemeEditorProvider theme={theme}>
          <CodeProvider initialCode={initialCode}>
            <BlocksProvider blocks={blocks}>
              <ScopeProvider scope={scope}>{children}</ScopeProvider>
            </BlocksProvider>
          </CodeProvider>
        </ThemeEditorProvider>
      </ElementProvider>
    </EditorProvider>
  </ThemeProvider>
)
