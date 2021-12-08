import Head from 'next/head'
import Layout from '../../src/components/Layout'

import Alert from '../../src/components/Alert'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <Alert type="success">Nice!</Alert>
    </Layout>
  )
}
