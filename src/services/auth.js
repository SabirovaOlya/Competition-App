import { alert } from '../components/alert/alert'
import { https } from './https'

export const login = async (data, setValue) => {
    try {
        const response = await https.post('/token/', data);
        const { data: userData } = response;
        console.log(userData);
        alert('Successful Login', 'success');
        window.location.reload(false);
        window.location.pathname = '/';
        setValue(_ => userData?.access)
        window.localStorage.setItem('token', userData?.access);
        // window.localStorage.setItem('name', userData?.user?.name);
        // window.localStorage.setItem('role', JSON.stringify(roles));
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Email or Password is wrong', 'error');
        }
    }
};

export const logout = async (setValue) => {
    try {
        const { data } = await https.post('/logout');
        window.localStorage.removeItem('token');
        // if (data?.message === 'Logged out') {
        // }
    } catch (err) {
        console.log(err)
    } finally {
        window.localStorage.clear();
        setValue(null)
    }
};