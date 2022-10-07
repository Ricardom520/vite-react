import React, { ReactElement, memo, useEffect, LegacyRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.less'

interface PopoverContentProps {
  /** 显隐 */
  visible: boolean
  /** 内容 */
  content: ReactElement
  /** top */
  top: number
  /** left */
  left: number
  /** ref */
  _ref: LegacyRef<HTMLDivElement>
}

const PopoverContent: React.FC<PopoverContentProps> = memo((props) => {
  const { content, visible, top, left, _ref } = props

  const element = createPortal(<div ref={_ref} style={{ top, left }} className={styles.wk_popover}>{content}</div>, document.body)

  return visible ? element : null
})

export default PopoverContent