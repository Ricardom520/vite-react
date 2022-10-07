import React, { ReactElement, useEffect, useState, useInsertionEffect, useRef, useLayoutEffect } from 'react'
import { createPortal, render } from 'react-dom'
import PopoverContent from './content'

interface PopoverProps {
  children: ReactElement
  content: ReactElement
}

const Popover: React.FC<PopoverProps> = (props) => {
  const { children, content } = props
  const slotRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(true)
  const [top, setTop] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)

  /** 鼠标进入，展示浮层内容 */
  const onMouseEnter = () => {
    console.log('进来了')
  }

  const onClick = () => {
    console.log('点击了')
  }

  useLayoutEffect(() => {
    if (slotRef.current && contentRef.current) {
      const slotRefRect = slotRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      setTop(slotRefRect.top - slotRefRect.height - contentRect.height)
      setLeft(slotRefRect.left - contentRect.width + slotRefRect.width)
    }
  }, [])

  return <>
    {React.cloneElement(children, {
      onMouseEnter: onMouseEnter,
      ref: slotRef
    })}
    <PopoverContent _ref={contentRef} visible={visible} content={content} top={top} left={left} />
  </>
}

export default Popover