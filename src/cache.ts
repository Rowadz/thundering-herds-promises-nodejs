import axios from 'axios'
import { stringify } from 'querystring'

const cache: Map<string, Promise<unknown>> = new Map()

type Req = { query: Record<string, number | string> }

const requests: Req[] = [
  { query: { q: 1 } },
  { query: { q: 1 } },
  { query: { q: 1 } },
  { query: { q: 2 } },
  { query: { q: 2 } },
  { query: { q: 2 } },
]

const END_POINT = 'http://0.0.0.0:4000'

const forwardRequests = async () => {
  for (const { query } of requests) {
    const url = `${END_POINT}?${stringify(query)}`
    const { data } = await axios.get<string>(url)
    console.log({ data })
  }
}

forwardRequests()
