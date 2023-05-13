export const BASE_URL = "https://hsi-sandbox.vercel.app/api/";

export default class Api {
    static async getArticleList({ perPage = 4, page = 1, sort = 'new', categoryId, excludedArticleId } = {}) {
        const res = await fetch(`${BASE_URL}articles?perPage=${perPage}&page=${page}&sort=${sort}&categoryId=${categoryId ?? ''}&excludedArticleId=${excludedArticleId ?? ''}`)
        return res
    }

    static async getArticleDetail({ slug }) {
        const res = await fetch(`${BASE_URL}articles/${slug}`)
        return res
    }
}