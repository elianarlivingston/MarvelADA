import { getParams, setParams, deleteParam } from './utils/URLParams.js'

// EXAMPLE
let url = location.href

url = setParams(url, { order_by: -1, others: 'jajajaj' })
console.log(url)

url = deleteParam(url, 'others')
console.log(url)

console.log(getParams(url))