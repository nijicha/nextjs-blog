import Layout from '../../src/components/Layout'

import { getAllPostsId, getPostData } from '../../src/lib/api/posts'

export default function Post(props) {
  const { postData } = props

  return(
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.data}
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

export async function getStaticProps(props) {
  const { params } = props
  const postData = getPostData(params.id)
  
  return {
    props: {
      postData
    }
  }
}