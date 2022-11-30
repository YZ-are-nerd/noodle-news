import post from "../store/post";
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { observer } from "mobx-react";

const PostDetailsCard = () => {
    const postStore = post
    if (postStore.postData) {
        return (
            <div 
            onClick={() => postStore.setPost(null)} className="w-screen h-screen fixed top-0 left-0 p-2 flex items-start justify-center bg-black/30 backdrop-blur">
                <motion.div 
                drag='y'
                dragConstraints={{top: 0, bottom: 0}}
                onDragEnd={(e, i) => {
                    if (i.offset.y > 200) {
                        postStore.setPost(null)
                    }
                }}
                className="w-full md:w-1/2 lg:w-1/3 h-fit p-2 rounded-xl flex flex-col gap-2">
                    <motion.article 
                    onClick={e => e.stopPropagation()} 
                    layoutId={postStore.postData._id} className='w-full h-fit max-h-screen flex flex-col cursor-pointer rounded-xl bg-neutral-900'>
                        {
                            postStore.postData.media !== 'http://trud-ost.ru/wp-content/themes/NewsReport/images/favicon.png' &&
                            <img loading='lazy' draggable={false} className='w-full h-fit rounded-xl object-cover' src={postStore.postData.media} alt="" />
                        }
                        <div className="w-full h-fit p-2 flex flex-col gap-2">
                            <h4>{postStore.postData.title}</h4>
                            <p>{DateTime.fromSQL(postStore.postData.published_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
                            <div className="w-full max-h-40 h-fit overflow-y-auto">
                                <p className="w-full h-fit">{postStore.postData.summary}</p>
                            </div>
                            <a target='_blank' href={postStore.postData.link}>Перейти</a>
                            <div className="w-full h-0.5 rounded-xl bg-neutral-800"/>
                            <div className="w-full h-fit flex items-center justify-between gap-2">
                                <div className="w-fit flex items-center gap-2">
                                    <h6>{postStore.postData.author}</h6>
                                </div>
                                <div className="w-fit flex items-center gap-2">
                                    <p className="hidden lg:inline">Источник:</p>
                                    <a href={postStore.postData.rights}>{postStore.postData.rights}</a>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                    {/* <section className='w-full h-fit p-2 flex flex-col cursor-pointer rounded-xl bg-neutral-900'>
                        <h3>Воможно вас заинтерисует</h3>
                    </section> */}
                </motion.div>
            </div>
        );
    } else return <></>

}
 
export default observer(PostDetailsCard);