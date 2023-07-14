import React from "react"

type PropsPostFooter = {
  author?: string
  category?: string
}

export default function PostFooter({ author, category }: PropsPostFooter) {
  return (
    <div className="mt-4">
      <span className="mr-2 text-gray-400">BY</span>
      <span>{author}</span>
      <span className="mx-2 text-gray-400">IN</span>
      <span>{category}</span>
    </div>
  )
}
