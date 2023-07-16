import ApiError from "@/common/error"
import { ResArticleDetail } from "../models/res-article-detail"
import { ResArticles } from "../models/res-articles"
import { ParamsGetArticleList } from "./api-types"

export const BASE_URL = "https://hsi-sandbox.vercel.app/api/"
const articleKey = "article"

export default class Api {
  static getArticleList(params: ParamsGetArticleList = {}) {
    params.perPage ??= 4
    params.page ??= 1
    params.sort ??= "popular"
    params.categoryId ??= ""
    params.excludedArticleId ??= ""

    const key = (): any[] => {
      return [
        articleKey,
        "list",
        Object.assign({}, params, { page: undefined }),
      ]
    }

    const req = async () => {
      const res = await fetch(
        `${BASE_URL}articles?perPage=${params.perPage}&page=${params.page}&sort=${params.sort}&categoryId=${params.categoryId}&excludedArticleId=${params.excludedArticleId}`,
      )
      return res.json() as ResArticles
    }

    return { params, key, req }
  }

  static getArticleDetail(slug: string) {
    const key = (): any[] => {
      return [articleKey, "slug", slug]
    }

    const req = async () => {
      const res = await fetch(`${BASE_URL}articles/${slug}`)
      if (!res.ok) throw new ApiError(res.status, res.statusText)
      return res.json() as ResArticleDetail
    }

    return { slug, key, req }
  }
}
