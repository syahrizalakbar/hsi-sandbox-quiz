import "@/styles/globals.css"
import type { AppProps } from "next/app"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * (60 * 1000), // 5 mins
            cacheTime: 10 * (60 * 1000), // 10 mins
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}
