import Head from 'next/head'

import Layout from '../../src/components/Layout'
import Date from '../../src/components/Date'
import utilStyles from '../../styles/utils.module.css'

import { getAllPostsId, getPostData } from '../../src/lib/api/posts'

export default function Post({ postData }) {
  return(
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostsId()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  
  return {
    props: {
      postData
    }
  }
}