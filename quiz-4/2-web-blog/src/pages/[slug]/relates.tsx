import React from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { GetServerSidePropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import Appbar from "@/components/appbar"
import Api from "@/data/api/api"
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query"
import ApiError from "@/common/error"

type PropsRelates = {
  slug: string
}

function DetailRelate({ slug }: PropsRelates) {
  /// Main article
  const detailArticle = Api.getArticleDetail(slug)
  const { data: article } = useQuery({
    queryKey: detailArticle.key(),
    queryFn: () => detailArticle.req(),
  })

  /// Related articles
  const relatedArticle = Api.getArticleList({
    categoryId: article?.data?.category?.id,
    excludedArticleId: article?.data?.id,
  })
  const relatedArticleQuery = useInfiniteQuery({
    queryKey: relatedArticle.key(),
    queryFn: ({ pageParam }) => {
      relatedArticle.params.page = pageParam
      return relatedArticle.req()
    },
    getNextPageParam: (lastPage, _) => {
      const page = lastPage.meta?.pagination?.page ?? 1
      const totalPage = lastPage.meta?.pagination?.totalPages ?? 1
      if (page < totalPage) {
        return page + 1
      }

      return undefined
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const relatedArticles = relatedArticleQuery.data?.pages.flatMap(
    (page) => page.data,
  )

  return (
    <>
      <Head>
        <title>Related - {article?.data?.title ?? ""}</title>
      </Head>
      <main className="bg-gray-100 pb-16">
        <div className="bg-white">
          <div className="container max-w-5xl mx-auto p-8">
            <Appbar showMenu={false} />
            <div>
              <span className="text-2xl font-semibold">Related Post List</span>
              <div className="mt-8 flex flex-col md:flex-row">
                <div className="relative w-full aspect-image md:w-80 md:mr-4">
                  <Link href={"/" + article?.data?.slug}>
                    <Image
                      className="rounded-md"
                      fill={true}
                      src={article?.data?.thumbnail ?? ""}
                      alt={article?.data?.title ?? ""}
                      sizes="100%"
                    ></Image>
                  </Link>
                </div>
                <div>
                  <Link href={"/" + article?.data?.slug}>
                    <h2 className="text-xl font-semibold mt-4 md:text-3xl">
                      {article?.data?.title}
                    </h2>
                  </Link>
                  <p className="text-lg mt-2 text-gray-600">
                    {article?.data?.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container max-w-5xl mx-auto p-8">
          {relatedArticles?.map((relatedArticle, index) => {
            return (
              <div
                key={relatedArticle?.id}
                className="flex flex-col-reverse bg-white rounded-lg shadow-lg border-2 mb-4 md:grid md:grid-cols-2"
              >
                <div className="p-8">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Link href={"/" + relatedArticle?.slug}>
                    <h2 className="text-2xl font-semibold mt-1">
                      {relatedArticle?.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500 mt-2 leading-8">
                    {relatedArticle?.summary}
                  </p>
                </div>
                <div className="w-full aspect-image relative">
                  <Link href={"/" + relatedArticle?.slug}>
                    <Image
                      fill={true}
                      src={relatedArticle?.thumbnail ?? ""}
                      alt={relatedArticle?.title ?? ""}
                      sizes="100%"
                    ></Image>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        {relatedArticleQuery.hasNextPage && (
          <button
            onClick={
              !relatedArticleQuery.isFetchingNextPage
                ? () => relatedArticleQuery.fetchNextPage()
                : undefined
            }
            className="flex mx-auto rounded-full border-primary px-4 py-2 border text-primary hover:text-white hover:bg-primary"
          >
            {relatedArticleQuery.isFetchingNextPage
              ? "Loading..."
              : "Load More"}
          </button>
        )}
      </main>
    </>
  )
}

export default DetailRelate

interface IParams extends ParsedUrlQuery {
  slug: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as IParams

  const queryClient = new QueryClient()
  const queryArticleDetail = Api.getArticleDetail(slug)

  try {
    const article = await queryClient.fetchQuery({
      queryKey: queryArticleDetail.key(),
      queryFn: () => queryArticleDetail.req(),
    })
    /// Related articles
    const queryArticleRelates = Api.getArticleList({
      categoryId: article.data?.category?.id,
      excludedArticleId: article.data?.id,
    })
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryArticleRelates.key(),
      queryFn: () => queryArticleRelates.req(),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        slug,
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
