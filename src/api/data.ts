const API_URL = 'https://newscatcher.p.rapidapi.com/v1'
export interface articles {
    author: string,
    clean_url: string,
    country: string,
    language: string,
    link: string,
    media: string,
    media_content: string[], 
    published_date: string,
    rank: number,
    rights: string,
    summary: string,
    title: string,
    topic: string,
    _id: string
}
export interface Posts {
    status: string,
    articles: articles[],
    user_input: {lang: string, country: string, topic: string, media: string}
}
export const api = (() => {
    const data = {

    }
    return {
        getData: async(topic: string) => {
            try {
                const res = await fetch(`${API_URL}/latest_headlines?topic=${topic}&lang=ru&country=RU&media=True`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '677857b8ebmshfda717c63be7034p17011cjsn0e6cbad46d3b',
                        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
                    }
                })
                const status = res.status
                if (status === 200) {
                    const data: Posts = await res.json()
                    return data        
                } else {
                    throw new Error(`Что-то не так, вот статус ${status}`)
                }
            } catch(e) {
                console.log(e);
            }
        },
        getSearch: async(term: string) => {
            try {
                const res = await fetch(`${API_URL}/search_free?q=${term}}&lang=ru&media=True`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '677857b8ebmshfda717c63be7034p17011cjsn0e6cbad46d3b',
                        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
                    }
                })
                const status = res.status
                if (status === 200) {
                    const data: Posts = await res.json()
                    console.log(data);
                    return data        
                } else {
                    throw new Error(`Что-то не так, вот статус ${status}`)
                }
            } catch(e) {
                console.log(e);
            }
        }
    }
})()