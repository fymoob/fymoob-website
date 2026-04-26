/**
 * GROQ queries — fonte única dos shapes que o site lê do Sanity.
 *
 * Use com sanityClient.fetch(...) ou sanityClientPreview.fetch(...).
 */

export const ALL_POSTS_QUERY = /* groq */ `
*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  updatedAt,
  "author": author->{name, role, "slug": slug.current},
  coverImage,
  tags,
  readingTime
}
`

export const POST_BY_SLUG_QUERY = /* groq */ `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  updatedAt,
  reviewedBy,
  nextReview,
  schemaType,
  "author": author->{
    name,
    "slug": slug.current,
    role,
    creci,
    bio,
    photo,
    email
  },
  coverImage,
  tags,
  readingTime,
  body,
  methodology,
  seo
}
`

export const POSTS_SLUGS_QUERY = /* groq */ `
*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current
`
