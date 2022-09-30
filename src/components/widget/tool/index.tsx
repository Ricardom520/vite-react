import React from 'react'
import Popover from '~@/widget/popover'
import FileBox from './fileBox'
import LogoIcon from './images/logo.png'
import styles from './index.module.less'

const Tool: React.FC = () => {

  return (
    <Popover content={<FileBox/>}>
      <div className={styles.ricar_tool}>
        <img className={styles.logo} src={LogoIcon} />
      </div>
    </Popover>
  )
}

export default Tool