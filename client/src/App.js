import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserForm from './components/UserForm';
import AuthContext from './auth';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar';
import { ProtectedRoute } from './Routes';
import AboutPage from './components/AboutPage';

function App() {
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const authContextValue = {
        fetchWithCSRF,
        currentUserId,
        setCurrentUserId
    };

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
                <Route path="/home" exact={true} component={Dashboard} currentUserId={currentUserId} />
                <ProtectedRoute path="/users/:id/edit"  component={UserForm} currentUserId={currentUserId} />
                <Route path="/">
                    <Redirect to="/home"/>
                </Route>
            </Switch>
        </BrowserRouter>}
    </AuthContext.Provider>
    );
}

export default App;