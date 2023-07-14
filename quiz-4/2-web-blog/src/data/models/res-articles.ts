// To parse this data:
//
//   import { Convert, ResArticles } from "./file";
//
//   const ResArticles = Convert.toResArticles(json);

export type ResArticles = {
  meta?: Meta
  data?: Article[]
}

export type Article = {
  id?: number
  category?: Category
  author?: Author
  thumbnail?: string
  slug?: string
  title?: string
  summary?: string
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

export type Meta = {
  pagination?: Pagination
  sort?: string
  categoryId?: number
  excludedArticleId?: number
}

export type Pagination = {
  page?: number
  perPage?: number
  totalPages?: number
}

// Converts JSON strings to/from your types
export class Convert {
  public static toResArticles(json: string): ResArticles {
    return JSON.parse(json)
  }

  public static ResArticlesToJson(value: ResArticles): string {
    return JSON.stringify(value)
  }
}
