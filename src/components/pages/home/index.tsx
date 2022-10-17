import React from 'react'
import LogoIcon from '~/images/logo.png'
import Demo from '~@/widget/demo'
import styles from './index.module.less'

const Home: React.FC = () => {
  return (
    <div className={styles['home']}>
      <div className={styles.box}>
        <img className={styles.logo} src={LogoIcon} />
        <h1>WelCome To The Vite 😋</h1>
      </div>
      <Demo />
    </div>
  )
}

export default Home
