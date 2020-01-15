import React from 'react'

import Canvas from './canvas'
import Layout from './layout'
import SidePanel from './panels/side'

export default () => {
  return (
    <Layout>
      <Canvas />
      <SidePanel />
    </Layout>
  )
}
