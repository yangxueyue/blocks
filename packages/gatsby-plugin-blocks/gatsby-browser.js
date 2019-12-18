import React from 'react'
import Editor from 'blocks-ui'
import * as Blocks from '@blocks/react'

const JSX = `
import React from 'react'
import { HeaderBasic } from '@blocks/react'

export default () => (
  <Blocks.Root>
    <HeaderBasic>
      <HeaderBasic.Logo to="/">Hello</HeaderBasic.Logo>
      <HeaderBasic.Nav>
        <HeaderBasic.Link to="/about">About</HeaderBasic.Link>
        <HeaderBasic.Link to="/blog">Blog</HeaderBasic.Link>
        <HeaderBasic.Link to="/contact">Contact</HeaderBasic.Link>
      </HeaderBasic.Nav>
    </HeaderBasic>
  </Blocks.Root>
)
`

const Layout = props => {
  return <div className="layout">{props.children}</div>
}

export const wrapPageElement = ({ element }) => {
  return (
    <Editor
      src={JSX}
      blocks={Blocks}
      layout={Layout}
      onChange={code => {
        //return
        fetch('/___blocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code,
            page: 'foo.js'
          })
        })
      }}
    />
  )
}
