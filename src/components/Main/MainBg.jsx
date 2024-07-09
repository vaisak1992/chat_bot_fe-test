import React from 'react'
import styles from './mainbg.module.css'
import ChatMain from '../Chatmain/ChatMain'

export default function MainBg() {
  return (
    <div className={styles.main}>
      <ChatMain/>
    </div>
  )
}
