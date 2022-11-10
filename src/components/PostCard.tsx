import { articles } from '../api/data';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import post from '../store/post';
import { observer } from 'mobx-react';
const articleCard = ({article, mode}: {article: articles, mode: string}) => {
    const postStore = post
    switch (mode) {
        case 'default':
            return (
                <motion.article onClick={() => postStore.setPost(article)} layoutId={article._id} 
                className='w-full h-fit flex flex-col shrink-0 cursor-pointer rounded-xl bg-neutral-900'>
                    {
                        article.media !== 'http://trud-ost.ru/wp-content/themes/NewsReport/images/favicon.png' &&
                        <img loading='lazy' draggable={false} className='w-full h-fit rounded-xl object-cover' src={article.media}  alt="" />
                    }
                    <div className="w-full h-fit p-2 flex flex-col gap-2">
                        <h4>{article.title}</h4>
                        <p>{article.summary.length >= 100 ? article.summary.substring(0, 100) + '...' : article.summary}</p>
                        <div className="w-full h-0.5 rounded-xl bg-neutral-800"/>
                        <div className="w-full h-fit flex items-center justify-between gap-2">
                            <div className="w-fit flex items-center gap-2">
                                <p>{DateTime.fromSQL(article.published_date).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</p>
                            </div>
                        </div>
                    </div>
                </motion.article>
            );
        case 'short':
        return (
            <motion.article onClick={() => postStore.setPost(article)} layoutId={article._id} 
            className='w-full h-fit flex flex-col cursor-pointer rounded-xl bg-neutral-900'>

                <div className="w-full h-fit p-2 flex flex-col gap-2">
                    <h4>{article.title}</h4>
                    <div className="w-full h-0.5 rounded-xl bg-neutral-800"/>
                    <div className="w-full h-fit flex items-center justify-between gap-2">
                        <div className="w-fit flex items-center gap-2">
                            <p>{DateTime.fromSQL(article.published_date).toLocaleString(DateTime.DATE_SHORT)}</p>
                        </div>
                    </div>
                </div>
            </motion.article>
        )
        default:
            return <></>;
    }

}
 
export default observer(articleCard);