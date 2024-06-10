import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import InputError from "../components/UI/inputError/InputError";
import {AuthContext} from "../context";
import { accounts } from '../utils/accounts';

const Login = () => {
    const {isAuth, setIsAuth, setRole} = useContext(AuthContext);
    const [showError, setShowError] = useState(false);
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleUsernameChange = (e) => {
        setLoginValue(e.target.value);
    };

    // Обработчик изменения инпута для пароля
    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const login = event => {
        event.preventDefault();
        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i]
            if ((account.login === loginValue && account.password === passwordValue) || isRegister) {
                setIsAuth(true);
                localStorage.setItem('auth', 'true')
                setShowError(false)
                setIsRegister(false)
                setRole(account.role)
                break
            }
        }
        if (!isAuth) {
            setShowError(true)
        }
    }

    const register = event => {
        event.preventDefault();
        setIsRegister(true)
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{isRegister ? 'Регистрация' : 'Вход'}</h1>
            <form style={{display: 'flex', flexDirection: 'column', minWidth: '360px'}} onSubmit={login}>
                <MyInput 
                    value={loginValue}
                    onChange={handleUsernameChange}
                    type="text" 
                    placeholder="Введите логин"
                />
                <MyInput 
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    type="password" 
                    placeholder="Введите пароль"
                />
                <MyButton style={{alignSelf: 'center', width: '100%'}}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</MyButton>
                {!isRegister ? <MyButton style={{alignSelf: 'center', width: '100%'}} onClick={register}>Регистрация</MyButton> : null}
                {showError ? <InputError>Неверный логин или пароль</InputError> : null}
            </form>
        </div>
    );
};

export default Login;