import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Hero.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>One Hundred Challenge</title>
        <meta name="description" content="Ecosystem" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://img.icons8.com/color/96/000000/100.png"/>
      </Head>
      <h1><span>100 </span>Days<br/>Challenge</h1>
            <div>
                <div className={styles.one}>1</div>
                <div className={styles.two}>2</div>
                <div className={styles.three}>3</div>
                <div className={styles.four}>4</div>
                <div className={styles.five}>...</div>
                <div className={styles.six}>...</div>
                <div className={styles.seven}>...</div>
                <div className={styles.eight}>98</div>
                <div className={styles.nine}>99</div>
                <div className={styles.ten}>100</div>
            </div>
            <Link href="/board"><a className={styles.linkButton}><button className={styles.homeButton}>Let's Start</button></a></Link>
            <a href="#" target="_blank" className={styles.linkButton}><button className={styles.docsButton}>Read Docs</button></a>

    </div>
  )
}
