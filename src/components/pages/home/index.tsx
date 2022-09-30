import React from 'react'
import LogoIcon from '~/images/logo.png'
import styles from './index.module.less'
import Tool from '~@/widget/tool'

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer} >
      <img className={styles.logo} src={LogoIcon} />
      <h1>
        WelCome To The Vite 😋
      </h1>
      <Tool />
    </div>
  )
}

export default Home