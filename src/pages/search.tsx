import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from 'react-use';
import { api, Posts } from "../api/data";
import CardList from "../components/CardList";
import { observer } from "mobx-react";
import PostCard from "../components/PostCard";
import { BiLoaderAlt } from "react-icons/bi";

const SearchPage = () => {
    const location = useLocation()
    const [search, setSearch] = useState<string>(location.state || '')
    const [debouncedValue, setDebouncedValue] = useState('');
    const [data, setData] = useState<Posts>()
    const [loading, setLoading] = useState<boolean>(false)
    const apiService = api 
    const getSearch = async() => {
        setLoading(true)
        const str = search.replace(/ /ig, '%20')
        const data = await apiService.getSearch(str)
        if (data?.articles.length !== 0 ) {
            setData(data)
            setLoading(false)
        }
    }
    const [, cancel] = useDebounce(
        () => {
          if (search !== '') {
            setDebouncedValue(search);
            getSearch()
          } else {
            cancel()
            setLoading(false)
          }
        },
        1000,
        [search]
    );
    useEffect(() => {
        if (location.state) {
            setSearch(location.state)
        }
    },[location.state])
    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <BiLoaderAlt className='animate-spin text-neutral-200' size={36} />
            </div>
        )
    } else return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full lg:w-1/3 h-fit mx-auto px-3 gap-4 flex flex-col">
                <motion.input layoutId="searchInp" value={search} onChange={e => setSearch(e.target.value)} 
                type="text" placeholder="Поиск..." className="w-full p-2 text-sm rounded-xl text-white bg-neutral-900" />
                <div className="w-full h-fit flex flex-col gap-2">
                    {
                        data && data.articles.map((article) => <PostCard article={article} mode='default' key={article._id} />)
                    }
                </div>
            </div>
        </div>
    );
}
 
export default observer(SearchPage);