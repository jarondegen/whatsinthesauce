import React, { useState, useEffect, useContext } from 'react';
import ShoppingLists from '../ShoppingList/ShoppingList';
import { getFridgeItems } from '../../store/fridge';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import '../../style/dashboard.css';
import DashFridge from './DashFridge';
import LoginForm from '../LoginForm';
import ListPage from '../ShoppingList/ListPage';
import arrow from '../../style/images/arrow.png'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { lists } = useSelector(store => store.Lists);
    const { currentUserId } = useContext(AuthContext);
    const { Fridge } = useSelector(store => store);
    const [dollars, setDollars] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [homeListId, setHomeListId] = useState()  

    useEffect(() => {
        dispatch(getFridgeItems(currentUserId));
    }, []);
    
    useEffect(() => {
        Fridge.map(item => {
            return item.expiring_soon ? setDollars(dollars + item.price) : null
        })
        setIsLoading(false)
    }, [Fridge]);

    console.log(lists)

    return (
        <>
            {isLoading ? <p>Loading...</p> : (
                <>
                    <div className="dashboard-page-container">
                        {!currentUserId ? <LoginForm /> : null}
                        {currentUserId && !homeListId && (
                            <div className="no-list-container">
                                <div class="no-lists-loaded-div">Pick one your lists...</div> 
                                <img id="homepage-arrow" src={arrow}/>
                            </div>
                        )}
                        {homeListId && <ListPage listId={homeListId} />}
                        <DashFridge dollars={dollars} />
                        <ShoppingLists homeListId={homeListId} setHomeListId={setHomeListId}/>
                    </div>
                    <div className="recipes-component-container">
                        {/*{currentUserId && <Recipes />}*/}
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard