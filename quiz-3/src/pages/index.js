import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Appbar from '@/components/Appbar'
import style from '@/styles/Blog.module.css'
import combineNames from '@/utils/combine_names'
import PostFooter from '@/components/PostFooter'
import Api from '@/lib/Api'


export default function Home({ posts, sort, page, perPage, totalPages }) {

  const [canNext, setCanNext] = useState(page < totalPages)
  const [loadingNext, setLoadingNext] = useState(false)
  const [currentPage, setCurrentPage] = useState(page)
  const [listArticle, setListArticle] = useState([])

  async function nextPage() {
    setLoadingNext(true)
    const res = await Api.getArticleList({ page: currentPage + 1, sort: sort })
    setLoadingNext(false)
    const data = await res.json();
    setCurrentPage(data.meta.pagination.page);
    setCanNext(data.meta.pagination.page < totalPages)
    setListArticle((prev) => [...prev, ...data.data])
  }

  useEffect(() => {
    setListArticle(posts);
  }, [posts]);

  return (
    <>
      <Head>
        <title>Home - Quiz 3</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar sortActive={sort} />
      <div className='wrapper'>
        {
          listArticle.map((value, index) => {
            return <div key={value.id} className={style.posts}>
              <div className={style.thumbnail}>
                <Link href={'/' + value.slug}>
                  <Image fill={true} src={value.thumbnail} alt={value.title} sizes='100%'></Image>
                </Link>
              </div>
              <PostFooter category={value.category?.name?.toUpperCase()} author={combineNames([value.author?.firstName, value.author?.middleName, value.author?.lastName]).toUpperCase()} />
              <Link href={'/' + value.slug}>
                <h1 className={style.title}>{value.title}</h1>
              </Link>
            </div>
          })
        }
      </div>
      {
        canNext && <button onClick={!loadingNext ? () => nextPage() : undefined} className={style.loadmore}>{loadingNext ? 'Loading...' : 'Load More'}</button>
      }
    </>
  )
}

export async function getServerSideProps(context) {

  let { sort } = context.query

  sort = (sort ?? 'popular').toLowerCase()

  const res = await Api.getArticleList({ sort: sort })
  const data = await res.json();

  return {
    props: {
      posts: data.data,
      sort: sort,
      page: data.meta.pagination.page,
      perPage: data.meta.pagination.perPage,
      totalPages: data.meta.pagination.totalPages,
    }
  }
}