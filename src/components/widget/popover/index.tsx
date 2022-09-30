import React, { ReactElement, useEffect } from 'react'
import { createPortal, render } from 'react-dom'

interface PopoverProps {
  children: ReactElement
  content: ReactElement
}

const Popover: React.FC<PopoverProps> = (props) => {
  console.log(props)
  const { children, content } = props
  

  /** 鼠标进入，展示浮层内容 */
  const onMouseEnter = () => {
    console.log('进来了')
  }

  const onClick = () => {
    console.log('点击了')
    createPortal(<div>
      123
      {content}
    </div>, document.body)
  }

  return React.cloneElement(children, {
    // onMouseEnter: onMouseEnter,
    onClick: onClick
  })
}

export default Popover