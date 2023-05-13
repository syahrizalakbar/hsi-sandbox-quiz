import React from 'react'
import Image from 'next/image'
import style from '@/styles/Blog.module.css'
import Appbar from '@/components/Appbar'
import PostFooter from '@/components/PostFooter'
import combineNames from '@/utils/combine_names'
import Link from 'next/link'
import { useState } from 'react'
import Api from '@/lib/Api'
import Head from 'next/head'

function DetailRelate({ article, page, perPage, totalPages, listOtherArticle }) {

    const [canNext, setCanNext] = useState(page < totalPages)
    const [loadingNext, setLoadingNext] = useState(false)
    const [currentPage, setCurrentPage] = useState(page)
    const [listPost, setListPost] = useState(listOtherArticle)

    async function nextPage() {
        setLoadingNext(true)
        const res = await Api.getArticleList({ perPage: perPage, excludeArticleId: article.id, page: currentPage + 1 })
        setLoadingNext(false)
        const data = await res.json();
        setCurrentPage(data.meta.pagination.page);
        setCanNext(data.meta.pagination.page < totalPages)
        setListPost((prev) => [...prev, ...data.data])
    }

    return <>
        <Head>
            <title>Related - {article?.title}</title>
        </Head>
        <div className={style.container}>
            <Appbar showMenu={false} />
            <br />
            <div className='wrapper'>
                <span className={style.relatesDesc}>Related Post List</span>
                <br />
                <br />
                <div className={style.relatesTop}>
                    <div className={style.relatesImage}>
                        <Image fill={true} src={article.thumbnail} alt={article.title}></Image>
                    </div>
                    <div>
                        <Link href={'/' + article?.slug}>
                            <h2 className={style.relatesTitle}>{article.title}</h2>
                        </Link>
                        <p className={style.relatesSummary}>{article.summary}</p>
                    </div>
                </div>
                <br />
            </div>
            <br />
            <br />
        </div>
        <br />
        <br />
        <div className='wrapper'>
            {
                listPost.map((v, i) => {
                    return <div key={i} className={style.relatesItemContainer}>
                        <div className={style.relatesItemDetail}>
                            <span className={style.relatesItemNumber}>{String(i + 1).padStart(2, '0')}</span>
                            <Link href={'/' + v?.slug}>
                                <h2 className={style.relatesItemTitle}>{v.title}</h2>
                            </Link>
                            <p className={style.relatesItemSummary}>{v.summary}</p>
                        </div>
                        <div className={style.relatesItemImage}>
                            <Image fill={true} src={v.thumbnail} alt={v.title}></Image>
                        </div>
                    </div>
                })
            }
        </div>
        <br />
        <br />
        {
            canNext && <button onClick={!loadingNext ? () => nextPage() : undefined} className={style.loadmore}>{loadingNext ? 'Loading...' : 'Load More'}</button>
        }
    </>
}

export default DetailRelate

export async function getServerSideProps(context) {
    const { slug } = context.params

    const res = await Api.getArticleDetail({ slug: slug })
    if (res.status == 404) {
        return {
            notFound: true
        }
    }

    const article = (await res.json()).data

    const res2 = await Api.getArticleList({ page: 1, categoryId: article.category.id, excludeArticleId: article.id })
    const { meta, data } = await res2.json();

    return {
        props: {
            article: article,
            page: meta.pagination.page,
            perPage: meta.pagination.perPage,
            totalPages: meta.pagination.totalPages,
            listOtherArticle: data,
        },
    }
}