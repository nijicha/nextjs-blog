import Head from 'next/head'
import Layout, { siteTitle } from '../src/components/Layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout isHomePage>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! Hello 🎉</p>
        <p>
          (This is sample website - you&apos;ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
