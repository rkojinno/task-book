import React, {useState,useEffect} from 'react';

import './App.css';
import './assets/style/style.scss'




import {useRoutes, navigate} from 'hookrouter';
import FullHistoryStore from './contextStore/fullHistoryStore';


import NavMenu from './components/navMenu.js'
import IntroView from './views/main/main'
import HistoryView from './views/history/history'
import NotFoundView from './views/notFound'




const routes = {
  '/': () => <IntroView></IntroView>,
  '/history': () => <HistoryView></HistoryView>,
};



export default () => {
  const [currentRoute, updateRoute] = useState(false);

  useEffect(() => {
    if(!currentRoute){
      goTo('')
    }
  }, [])

  const goTo = (route) => { 
    navigate(`/${route}`);
    updateRoute(route)
  }

  
  const routeResult = useRoutes(routes);  

  return (
    <FullHistoryStore>
      <div className={'app'}>



      <section id={'header-section'} className={'header-section'}>
        <div className={'page-title'}>
          <img className={'logo'} src="assets/images/t-book.png" alt="image" />
          <h1 className={'font_xl'}> Task-Book <span className={'font_md'}> / {currentRoute ? currentRoute : 'home'}  </span> </h1>
          <NavMenu currentRoute={currentRoute} goTo={(route) => {goTo(route)}}></NavMenu>
        </div>
        

      </section>
      

      {!routeResult && <NotFoundView/>}
      {routeResult}

      </div>
    </FullHistoryStore>
  )
  


}

