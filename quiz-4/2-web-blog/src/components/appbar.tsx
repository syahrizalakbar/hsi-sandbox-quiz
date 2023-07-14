import React, { memo } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"

type PropsAppbar = {
  sortActive?: string
  showMenu: boolean
}

function Appbar({ sortActive, showMenu = true, ...rest }: PropsAppbar) {
  const router = useRouter()

  function sort(path: string) {
    router.push(`/?sort=${path}`)
  }

  return (
    <div
      className="flex place-content-between relative flex-row mb-12 md:place-content-center "
      {...rest}
    >
      {showMenu && (
        <div className="md:absolute md:left-0">
          <button
            onClick={() => sort("new")}
            className={`px-4 py-2 rounded-lg text-lg font-bold mr-4 ${
              sortActive == "new" ? "text-white bg-primary " : undefined
            }`}
          >
            New
          </button>
          <button
            onClick={() => sort("popular")}
            className={`px-4 py-2 rounded-lg text-lg font-bold ${
              sortActive == "popular" ? "text-white bg-primary " : undefined
            }`}
          >
            Popular
          </button>
        </div>
      )}

      <Link href="/">
        <Image src="/logo.png" alt="logo" width={99} height={29} />
      </Link>
    </div>
  )
}

export default memo(Appbar)
