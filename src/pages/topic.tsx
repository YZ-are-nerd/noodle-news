import { observer } from 'mobx-react';
import post from "../store/post";
import { topics } from '../api/topics';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import CardList from '../components/CardList';

const TopicPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const topicStore = post
    const params = useParams()
    const topicsList = topics
    const navigate = useNavigate()
    useEffect(() => {
        console.log(topicStore.topicData, params.id);
        setLoading(true)
        if (!topicStore.topicData) {
            const indexTopic = topicsList.findIndex((topic) => topic.topic === params.id!)
            if (indexTopic !== -1) {
                topicStore.setTopic(topicsList[indexTopic])
                // navigate(`/topic/${topicsList[indexTopic].topic}`)
            } else {
                navigate('/')
            }
        }
        setTimeout(() => {
            setLoading(false)            
        }, 1000);
    },[topicStore.topicData?.topic])
    if (!topicStore.topicData || loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <BiLoaderAlt className='animate-spin text-neutral-200' size={36} />
            </div>
        )
    } else return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full lg:w-2/3 px-3 lg:px-0 h-full gap-2 mx-auto flex flex-col items-start">
                <h2>{topicStore.topicData?.title}</h2>
                <CardList cardmode='default' topic={topicStore.topicData.topic} limit={50} />
            </div>
        </div>
    );
}
 
export default observer(TopicPage);