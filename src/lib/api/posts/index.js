import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'src/lib/api/posts/mock')

export function getPostsData() {
  const fileNames = fs.readdirSync(postsDir)
  const allPostsData = fileNames.map(fileName => {
    // Remove extension ".md" from file name to get id (aka slug)
    const id = fileName.replace(/\.md$/, '')

    // Read markdown content
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the pose metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostsId() {
  const fileNames = fs.readdirSync(postsDir)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const parsedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = parsedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
