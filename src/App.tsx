
import { Route, Routes, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import btn from './styles/components/button.module.css'
import { BiChevronUp, BiLoaderAlt, BiSearch } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc'
import post, { Topic } from "./store/post";
import { AnimatePresence, motion, useInView } from 'framer-motion';
import PostDetailsCard from './components/PostDetailsCard';
import { observer } from "mobx-react";
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { topics } from "./api/topics";
import { useDebounce } from "react-use";
import SearchPage from './pages/search';

const MainPage = lazy(() => import('./pages/index'));
const TopicPage = lazy(() => import("./pages/topic"));
const App = () => {
  const postStore = post
  const ref = useRef(null)
  const footerRef= useRef(null)
  const navref = useRef(null)
  const inView = useInView(navref)
  const [search, setSearch] = useState<string>('')
  const [isHide, setIsHide] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue, setDebouncedValue] = useState('');
  const [, cancel] = useDebounce(
      () => {
        if (search !== '') {
          setDebouncedValue(search);
          navigate('/search', { state: search.toLowerCase() })  
        }
      },
      1000,
      [search]
  );
  const setTopic = (topic: Topic) => {
    postStore.setTopic(topic)
    navigate(`/topic/${topic.topic}`)
  }
  useEffect(() => {
    const indexOfRoute = location.pathname.indexOf('search')
    if (indexOfRoute !== -1) {
      setIsHide(true)
    } else {
      setIsHide(false)
    }
  },[location.pathname])
  return (
    <div key='root' className="max-w-screen min-h-screen flex gap-2 flex-col justify-between overflow-x-hidden">
      <AnimatePresence initial={false} key='root'>
        <nav key='nav' ref={navref} id="nav" className="w-full h-fit mb-4 gap-2 py-3 pb-0 lg:px-0 px-3 flex flex-col bg-black">
          <div className="w-full lg:w-2/3 h-fit mx-auto flex items-center justify-between">
            <h2 onClick={() => navigate('/')}>Noodle News</h2>
            {/* <button className={btn.btn_neutral}><FcGoogle size={20}/>Войти</button> */}
            {
              !isHide &&
              <>
                <motion.input layoutId="searchInp" value={search} 
                onChange={e => setSearch(e.target.value)} type="text" 
                placeholder="Поиск..." className="w-64 p-2 hidden lg:inline text-sm rounded-xl text-white bg-neutral-900" />
                <button onClick={() => navigate('/search')} className={btn.btn_neutral_sm + ' p-2 inline lg:hidden'}><BiSearch size={20}/></button>
              </>
            }
          </div>
          <div ref={ref} className="w-full lg:w-2/3 h-fit mx-auto flex items-center justify-between overflow-hidden">
            <motion.div drag='x' dragConstraints={ref}  className="w-fit h-fit flex items-center gap-2">
                {
                  topics.map((topic, index) => {if(index !== 0) return <button key={topic.topic + ' nav'} onClick={() => setTopic(topic)} className={btn.btn_neutral_sm}>{topic.title}</button>})
                }
              </motion.div>
          </div>
        </nav>
        <Suspense fallback={<div className="w-full min-h-screen flex flex-col items-center justify-center"><BiLoaderAlt className='animate-spin text-neutral-200' size={36} /></div>}>
          <Routes key='routeStore'>
            <Route key='rootRoute' path="/" element={<MainPage/>} />
            <Route key='topicRoute' path="/topic/:id" element={<TopicPage/>} />
            <Route key='searchRoute' path="/search" element={<SearchPage/>} />
          </Routes>
        </Suspense>

        {
          postStore.postData &&
          <PostDetailsCard key='1' />
        }
        {
          !inView &&
          <a href="#nav" className={btn.btn_primary_sm + ' p-1 fixed bottom-3 right-3'}><BiChevronUp size={20}/></a>
        }
        <footer key='footer' className="w-full h-fit p-2 flex flex-col rounded-t-xl gap-2 bg-neutral-900">
          <div className="w-full h-fit flex items-center justify-between">
            <h4>Noodle News</h4>
            <a target='_blank' href="#">Также от Noodle</a>
          </div>
          <div ref={footerRef} className="w-full h-fit py-2 flex items-center">
            <motion.div drag='x' dragConstraints={footerRef}  className="w-fit h-fit flex items-center gap-2">
              {
                topics.map((topic, index) => {if(index !== 0) return <button key={topic.topic + ' footer'} onClick={() => setTopic(topic)} className={btn.btn_neutral_sm}>{topic.title}</button>})
              }
            </motion.div>
          </div>
        </footer>
      </AnimatePresence>
    </div>
  )
}

export default observer(App)
