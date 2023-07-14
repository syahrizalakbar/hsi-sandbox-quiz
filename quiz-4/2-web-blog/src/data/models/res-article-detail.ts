// To parse this data:
//
//   import { Convert, ResArticleDetail } from "./file";
//
//   const resArticleDetail = Convert.toResArticleDetail(json);

export type ResArticleDetail = {
  data?: ArticleDetail
}

export type ArticleDetail = {
  id?: number
  category?: Category
  author?: Author
  thumbnail?: string
  slug?: string
  title?: string
  summary?: string
  content?: string
}

export type Author = {
  id?: number
  firstName?: string
  middleName?: string
  lastName?: string
}

export type Category = {
  id?: number
  name?: string
}

// Converts JSON strings to/from your types
export class Convert {
  public static toResArticleDetail(json: string): ResArticleDetail {
    return JSON.parse(json)
  }

  public static resArticleDetailToJson(value: ResArticleDetail): string {
    return JSON.stringify(value)
  }
}
