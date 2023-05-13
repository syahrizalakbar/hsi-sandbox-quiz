import React from 'react'
import style from '@/styles/Blog.module.css'

export default function PostFooter({ author, category }) {
    return (
        <div>
            <span className={style.by}>BY</span>
            <span>{author}</span>
            <span className={style.in}>IN</span>
            <span>{category}</span>
        </div>
    )
}
