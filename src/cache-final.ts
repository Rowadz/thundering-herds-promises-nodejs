import axios, { AxiosResponse } from 'axios'
import { stringify } from 'querystring'

const cache: Map<string, Promise<AxiosResponse<string>>> = new Map()

type Req = { query: Record<string, number | string> }

const requests: Req[] = Array.from({ length: 1000 }).map((_, i: number) => ({
  query: { q: i % 2 === 1 ? 1 : 2 },
}))

const END_POINT = 'http://0.0.0.0:4000'
const result: string[] = []

const forwardRequests = async () => {
  for (const { query } of requests) {
    const queryStr = stringify(query)
    const cachedPromise = cache.get(queryStr)
    if (cachedPromise) {
      const { data } = await cachedPromise
      console.log({ data })
      result.push(data)
    } else {
      const url = `${END_POINT}?${queryStr}`
      const promise = axios.get<string>(url)
      cache.set(queryStr, promise)
      const { data } = await promise
      console.log({ data })
      result.push(data)
    }
  }

  console.log(result.length, requests.length)
}

forwardRequests()
