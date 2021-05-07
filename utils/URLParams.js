export const getParams = (url) => {
    try {
        const searchs = new URL(url).searchParams
        const params = {}

        for (const [key, value] of searchs) {
            params[key] = value
        }

        // Readonly
        // for (const key in params) {
        //     Object.defineProperty(params, key, { value: params[key], writable: false })
        // }
        
        return params
    } catch (error) {
        console.error(error)
        return {}
    }
}
export const setParams = (url, params) => {
    try {
        const newUrl = new URL(url)

        for (const key in params) {
            newUrl.searchParams.append(key, params[key])
        }
        
        return newUrl.toString()
    } catch (error) {
        console.error(error)
        return ''
    }
}
export const deleteParam = (url, key) => {
    const newUrl = new URL(url)

    newUrl.searchParams.delete(key)

    return newUrl.toString()
}  