import { useContext, useCallback } from 'react';
import { AuthContext } from './context/context'
import Main from './pages/main/layout'
import Login from './pages/login/index'

function App() {
  const { token, setToken } = useContext(AuthContext)

  const handleLogin = async (data) => {
    try {
      // await login(data, setToken);
    } catch (error) {
      console.log(error)
    }
  };

  const handleLogout = useCallback(async () => {
    // await logout(setToken);
  }, [setToken]);

  return token ?
    <Main logOutHendle={handleLogout} /> :
    <Login
      setToken={setToken}
      onLogin={handleLogin}
    />
}

export default App;
