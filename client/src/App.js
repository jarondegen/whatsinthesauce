import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import UserList from './components/UsersList';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';
import AuthContext from './auth';
import Dashboard from './components/Dashboard';
import ListPage from './components/ShoppingList/ListPage'

import { ProtectedRoute, AuthRoute } from './Routes';

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
                <ul>
                    <li><NavLink to="/home" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                    {currentUserId ? 
                    <li><a onClick={logoutUser} href="#" activeclass="active">Logout</a></li>
                    : <li><NavLink to="/login" activeclass="active">Login</NavLink></li>}
                </ul>
            </nav>
            <Switch>
                <ProtectedRoute path="/users" exact={true} component={UserList} currentUserId={currentUserId} />
                <ProtectedRoute path="/lists/:id" exact={true} component={ListPage} currentUserId={currentUserId} />
                <ProtectedRoute path="/home" exact={true} component={Dashboard} currentUserId={currentUserId} />
                <ProtectedRoute path="/users/:id/edit" component={UserForm} currentUserId={currentUserId} />
                <AuthRoute path="/login" component={LoginForm} />
                <Route path="/">
                    <h1>My Home Page</h1>
                </Route>
            </Switch>
        </BrowserRouter>}
    </AuthContext.Provider>
    );
}

export default App;