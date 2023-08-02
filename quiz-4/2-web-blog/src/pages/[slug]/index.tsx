import Image from "next/image"
import { useMemo } from "react"
import React from "react"
import combineNames from "@/utils/combine_names"
import Link from "next/link"
import Head from "next/head"
import Api from "@/data/api/api"
import { GetStaticPropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import Appbar from "@/components/appbar"
import PostFooter from "@/components/post-footer"
import { ArticleDetail } from "@/data/models/res-article-detail"
import { useQuery } from "@tanstack/react-query"
import ApiError from "@/common/error"

type DetailProps = {
  article: ArticleDetail
}

function Detail({ article }: DetailProps) {
  const { key, req } = useMemo(
    () =>
      Api.getArticleList({
        categoryId: article?.category?.id,
        excludedArticleId: article.id,
      }),
    [article],
  )
  const related = useQuery(key(), () => req())

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <main className="bg-gray-100">
        <div className="bg-white">
          <div className="container max-w-5xl mx-auto p-8">
            <Appbar showMenu={false} />
            <div>
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-gray-600">
                {article.title}
              </h2>
              <p className="mt-6 text-lg ">{article.summary}</p>

              <PostFooter
                category={article.category?.name?.toUpperCase()}
                author={combineNames([
                  article.author?.firstName,
                  article.author?.middleName,
                  article.author?.lastName,
                ]).toUpperCase()}
              />
            </div>
          </div>
        </div>
        <div className="container max-w-5xl mx-auto p-8">
          <div className="relative aspect-image">
            <Image
              fill={true}
              src={article.thumbnail ?? ""}
              alt={article.title ?? ""}
              sizes="100%"
            ></Image>
          </div>
          <p className="my-8 leading-10 text-lg text-gray-600">
            {article.content}
          </p>

          {(related.data?.data?.length ?? 0) > 0 && (
            <div>
              <div className="flex flex-row place-content-between mb-10">
                <h3 className="text-xl font-semibold text-gray-700">
                  You might also like...
                </h3>
                <Link
                  href={article.slug + "/relates"}
                  className="text-xl font-semibold text-gray-400"
                >
                  More
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {related.data?.data?.map((article) => {
                  return (
                    <div key={article.id}>
                      <Link href={"/" + article.slug}>
                        <div className="relative aspect-image">
                          <Image
                            className=" rounded-md"
                            fill={true}
                            src={article.thumbnail ?? ""}
                            alt={article.title ?? ""}
                            sizes="100%"
                          ></Image>
                        </div>
                      </Link>
                      <PostFooter
                        category={article.category?.name?.toUpperCase()}
                        author={combineNames([
                          article.author?.firstName,
                          article.author?.middleName,
                          article.author?.lastName,
                        ]).toUpperCase()}
                      />
                      <Link href={"/" + article.slug}>
                        <h3 className="text-lg font-semibold mt-2 md:text-2xl">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-md text-gray-500 mt-2">
                        {article.summary}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Detail

interface IParams extends ParsedUrlQuery {
  slug: string
}

export async function getStaticPaths() {
  const { req } = Api.getArticleList()
  const res = await req()

  return {
    paths: res.data?.map((article) => {
      return { params: { slug: article.slug } }
    }),
    fallback: "blocking",
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams

  const { req } = Api.getArticleDetail(slug)
  try {
    const res = await req()
    return {
      props: {
        article: res.data,
      },
    }
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.code == 404) {
        return {
          notFound: true,
        }
      }
    }
    throw e
  }
}
