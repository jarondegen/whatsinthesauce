import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MyAccount from './components/Dashboard/MyAccount';
import { useDispatch } from 'react-redux';
import { getIngredients } from './store/ingredients';
import AuthContext from './auth';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar';
import { ProtectedRoute } from './Routes';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

function App() {
    const dispatch = useDispatch()
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const authContextValue = {
        fetchWithCSRF,
        currentUserId,
        setCurrentUserId,
    };

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    const logoutUser = async ()=> {
            const response = await fetchWithCSRF('/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if(response.ok){
                setCurrentUserId(null)
            }
    }

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
                if(authData.current_user_id){
                    setCurrentUserId(authData.current_user_id)
                }
            }
            setLoading(false)
        }
        restoreCSRF();
    }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
        {loading && <div>Loading...</div>}
        {!loading &&
        <BrowserRouter>
            <nav>
                <NavBar logoutUser={logoutUser}/>
            </nav>
            <Switch>
                <Route path="/about" exact={true} component={AboutPage}/>
                <ProtectedRoute path="/account" exact={true} currentUserId={currentUserId} component={MyAccount}/>
                <Route path="/home" exact={true} component={Dashboard} currentUserId={currentUserId} />
                <Route path="/">
                    <Redirect to="/home"/>
                </Route>
            </Switch>
        </BrowserRouter>}
        <Footer />
    </AuthContext.Provider>
    );
}

export default App;