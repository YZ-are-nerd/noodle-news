import btn from '../styles/components/button.module.css'
import { observer } from 'mobx-react';
import CardList from '../components/CardList';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full lg:w-2/3 px-3 lg:px-0 h-full mx-auto flex flex-col items-start">
                {/* <div className="w-full h-fit flex items-center gap-2">
                    <button className={btn.btn_neutral_sm}>Технологии</button><button className={btn.btn_neutral_sm}>Со вмего мира</button>
                </div> */}
                <div className="w-full h-full gap-2 py-2 flex">
                    <div className="md:w-full lg:w-4/6 h-full gap-2 flex flex-col items-start">
                        <h2>Последние новости</h2>
                        <CardList cardmode='default' topic='news' limit={20} />
                    </div>
                    <div className="w-2/6 h-full gap-2 hidden lg:flex flex-col">
                        <h2>Новости с других тем</h2>
                        <div className="w-full h-fit flex flex-col p-2 gap-2 rounded-xl bg-neutral-900">
                            <div className="w-full h-fit flex items-center justify-between">
                                <h3>Технологии</h3>
                                <button onClick={() => navigate('/topic/tech')} className={btn.btn_neutral_sm}>Хочу больше</button>
                            </div>
                            <div className="w-full h-0.5 rounded-xl bg-neutral-800"/>
                            <CardList cardmode='short' topic='tech' limit={5} />
                        </div>
                        <div className="w-full h-fit flex flex-col p-2 gap-2 rounded-xl bg-neutral-900">
                            <div className="w-full h-fit flex items-center justify-between">
                                <h3>Мир</h3>
                                <button onClick={() => navigate('/topic/world')} className={btn.btn_neutral_sm}>Хочу больше</button>
                            </div>
                            <div className="w-full h-0.5 rounded-xl bg-neutral-800"/>
                            <CardList cardmode='short' topic='world' limit={5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default observer(MainPage);