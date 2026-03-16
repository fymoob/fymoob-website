export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  readingTime: number
  content: string
}
