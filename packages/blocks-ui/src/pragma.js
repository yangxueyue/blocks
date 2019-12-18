/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useCode } from './code-context'
import { uuidName } from './constants'

const IGNORED_TYPES = ['path']

export default (type, props, ...children) => {
  const { currentElementId, setCurrentElementId } = useCode()

  props = props || {}
  const { [uuidName]: id, sx = {} } = props
  delete props[uuidName]

  const isCurrentElement = id && id === currentElementId

  if (IGNORED_TYPES.includes(type)) {
    return jsx(type, props, ...children)
  }

  return jsx(
    type,
    {
      ...props,
      sx: {
        ...sx,
        boxShadow: isCurrentElement
          ? 'inset 0px 0px 0px 2px #0079FF'
          : sx.boxShadow
      },
      onClick: e => {
        e.stopPropagation()
        if (id) {
          setCurrentElementId(id)
        }
      }
    },
    ...children
  )
}
