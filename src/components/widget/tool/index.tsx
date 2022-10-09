import React, { useEffect, useRef, useState } from 'react'
import FileBox from './fileBox'
import LogoIcon from './images/logo.png'
import styles from './index.module.less'

const Tool: React.FC = () => {
  const toolRef = useRef<HTMLDivElement>(null)
  const timer = useRef<NodeJS.Timeout | null>()
  const [top, setTop] = useState<number>(document.documentElement.clientHeight - 80)
  const [left, setLeft] = useState<number>(document.documentElement.clientWidth - 80)
  const [visible, setVisible] = useState<boolean>(false)

  // 鼠标点击
  const onMouseDown = () => {
    if (timer.current) return
    timer.current = setTimeout(() => {
      clearTimeout(timer.current as NodeJS.Timeout)
      timer.current = null
      window.onmousemove = (e: MouseEvent) => {
        setTop(e.y - 25)
        setLeft(e.x - 27.5)
        window.onmouseup = () => {
          window.onmousemove = null
          window.onmouseup = null
        }
      }
    }, 1000)
  }

  // 双击事件
  const onDoubleClick = () => {
    clearTimeout(timer.current as NodeJS.Timeout)
    timer.current = null
    setVisible(true)
  }

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setTop(document.documentElement.clientHeight - 80)
        setLeft(document.documentElement.clientWidth - 80)
      },
      false
    )
  }, [])

  useEffect(() => {
    if (visible) {
      window.onclick = (e: Event) => {
        if (!toolRef.current?.contains(e.target as Node) && toolRef.current !== e.target) {
          setVisible(false)
          window.onclick = null
        }
      }
    }
  }, [visible])

  return (
    <div
      ref={toolRef}
      className={styles.ricar_tool}
      style={{ top, left }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FileBox visible={visible} />
      <img className={styles.logo} src={LogoIcon} />
    </div>
  )
}

export default Tool
