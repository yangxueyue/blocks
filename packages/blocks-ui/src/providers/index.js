import React from 'react'
import { ThemeProvider } from 'theme-ui'

import CodeProvider from './code'
import EditorProvider from './editor'
import ThemeEditorProvider from './theme-editor'
import ElementProvider from './element'
import ScopeProvider from './scope'

export default ({ initialCode, scope, children, theme, appTheme }) => (
  <ThemeProvider theme={appTheme}>
    <EditorProvider>
      <ElementProvider>
        <ThemeEditorProvider theme={theme}>
          <CodeProvider initialCode={initialCode}>
            <ScopeProvider scope={scope}>{children}</ScopeProvider>
          </CodeProvider>
        </ThemeEditorProvider>
      </ElementProvider>
    </EditorProvider>
  </ThemeProvider>
)
