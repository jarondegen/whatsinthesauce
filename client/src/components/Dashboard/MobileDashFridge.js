import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import x from '../../style/images/x.png';
import { getFridgeItems } from '../../store/fridge';

const MobileDashFridge = ({dollars, setDollars, setIsLoading}) => {
    const dispatch = useDispatch()
    const { Fridge } = useSelector(store => store);
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);

    const handleRemoveItemFromFridge = async (e) => {
        const data = await fetchWithCSRF(`/api/fridges/delete/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (data.ok) {
            const response = await data.json();
            dispatch(getFridgeItems(currentUserId));
            console.log(response)
        }
    }

    useEffect(() => {
        if (currentUserId) {
            dispatch(getFridgeItems(currentUserId));
        }
    }, [currentUserId])

    useEffect(() => {
        let y = 0
        Fridge.map(item => {
            if (item.expiring_soon && item.price) {
                y = y + item.price
            };
        });
        setDollars(y);
        setIsLoading(false);
    }, [Fridge]);

    return (
        <div className="mobile-inside-fridge-container">
            <div className="mobile-dollars">    
                <span >{`$${dollars} worth of food expiring soon`}</span>
            </div>
            <div className="fridge-item-container-labels" >
                <span className="fridge-item-name underline">Ingredient</span>
                <span className="fridge-item-expire underline">Expiring</span>
                <span className="fridge-item-price underline">Price</span>
                <span className="fridge-item-delete underline">Remove</span>
            </div>
            {Fridge && Fridge.map((item, i) => 
                <div key={i} className="fridge-item-container" >
                    <span className="fridge-item-name">{item.name}</span>
                    <span className="fridge-item-expire" className={item.expiring_soon ? 'expiring_soon' : 'not_expiring_soon'} >{item.expires_on.split(" ").slice(0,3).join(" ")}</span>
                    <span className="fridge-item-price">{item.price === null || item.price === 0 ? 'None' : `$${item.price}`}</span>
                    <span className="fridge-item-delete"><img className="delete-fridge-item-x" src={x} onClick={handleRemoveItemFromFridge} id={item.id}/></span>
                </div>
            )}
            
        </div>
    );
};

export default MobileDashFridge;