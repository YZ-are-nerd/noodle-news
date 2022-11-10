import { api, Posts } from '../api/data';
import { useState, useLayoutEffect } from 'react';
import PostCard from './PostCard';
import { observer } from 'mobx-react';
const CardList = ({topic, limit, cardmode}: {topic: string, limit: number, cardmode: string}) => {
    const [data, setData] = useState<Posts>()
    const apiService = api
    const fetchData = async() => {
      const api_data = await apiService.getData(topic)
      if (api_data) {
        api_data.articles.length = limit
        setData(api_data)
      }
    }
    useLayoutEffect(() => {
      fetchData()
    },[])
    return (
        <div className="w-full h-fit gap-2 flex flex-col">
            {
                data?.articles.length !== 0 && data?.articles.map((post, index) => <PostCard  mode={cardmode} key={post._id} article={post} />)
            }
        </div>
    );
}
 
export default observer(CardList);