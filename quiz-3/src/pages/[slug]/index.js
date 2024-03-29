import Appbar from '@/components/Appbar'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React, { useEffect } from 'react'
import style from '@/styles/Blog.module.css'
import PostFooter from '@/components/PostFooter'
import combineNames from '@/utils/combine_names'
import Link from 'next/link'
import Api from '@/lib/Api'
import Head from 'next/head'

function Detail({ article }) {

    const [listRelated, setListRelated] = useState([])
    const [loading, setLoading] = useState(true)

    async function getRelated(categoryId) {
        const res = await Api.getArticleList({ perPage: 2, categoryId: categoryId, excludedArticleId: article.id })
        setLoading(false)
        const data = await res.json();
        console.log(data)
        setListRelated(data.data);
    }

    useEffect(() => {
        getRelated(article.category.id)
    }, [article])

    return <>
        <Head>
            <title>{article.title}</title>
        </Head>
        <div className={style.container} style={{ marginBottom: '24px', paddingBottom: '24px' }}>
            <Appbar showMenu={false} />
            <div className='wrapper'>
                <h2 className={style.detailTitle} style={{ marginBottom: '16px' }}>{article.title}</h2>
                <p className={style.detailSummary}>{article.summary}</p>

                <PostFooter category={article?.category?.name?.toUpperCase()} author={combineNames([article?.author?.firstName, article?.author?.middleName, article?.author?.lastName]).toUpperCase()} />
            </div>
        </div>
        <div className='wrapper' style={{ paddingBottom: '24px' }}>
            <div className={style.thumbnail} style={{ marginBottom: '24px' }}>
                <Image fill={true} src={article.thumbnail} alt={article.title} sizes='100%'></Image>
            </div>
            <p className={style.detailContent}>{article.content}</p>

            {
                (!loading && listRelated.length > 0) &&
                <div>
                    <div className={style.relatedHead}>
                        <h3>You might also like...</h3>
                        <Link href={article.slug + '/relates'}>More</Link>
                    </div>
                    <div className={style.related}>
                        {
                            listRelated.map((article) => {
                                return <div key={article.id} className={style.relatedItem}>
                                    <div className={style.relatedItemThumbnail}>
                                        <Link href={'/' + article.slug}>
                                            <Image fill={true} src={article.thumbnail} alt={article.title} sizes='100%'></Image>
                                        </Link>
                                    </div>
                                    <PostFooter category={article.category?.name?.toUpperCase()} author={combineNames([article.author?.firstName, article.author?.middleName, article.author?.lastName]).toUpperCase()} />
                                    <Link href={'/' + article.slug}>
                                        <h3 className={style.relatedItemTitle}>{article.title}</h3>
                                    </Link>
                                    <p className={style.relatedItemSummary}>{article.summary}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

        </div>
    </>
}

export default Detail

export async function getStaticPaths() {

    const res = await Api.getArticleList()
    const articles = (await res.json()).data

    return {
        paths: articles.map((article) => { return { params: { slug: article.slug } } }),
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx) {
    const { slug } = ctx.params

    const res = await Api.getArticleDetail({ slug: slug })

    if (res.status == 404) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            article: (await res.json()).data
        }
    }
}

