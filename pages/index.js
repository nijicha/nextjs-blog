import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../src/components/Layout'
import Date from '../src/components/Date'
import utilStyles from '../styles/utils.module.css'

import { getPostsData } from '../src/lib/api/posts'

export default function Home({ allPostsData }) {
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
