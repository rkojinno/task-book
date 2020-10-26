import React from 'react';




export default ({currentRoute,goTo}) => {


    return (
        <div className={'menu-nav'}>
                <button data-testid="home-nav-button" id="home-nav" className={currentRoute == ''? 'button-active' : '' } onClick={ () => goTo('')}>Home
                </button>
                <button data-testid="history-nav-button" id="history-nav" className={currentRoute == 'history'? 'button-active' : '' }  onClick={ () => goTo('history')}> History
                </button>
        </div>
    )

}