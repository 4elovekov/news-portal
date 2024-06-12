import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {userName, isAuth, setIsAuth, setRole} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        setRole(null);
        localStorage.removeItem('auth')
        localStorage.removeItem('userName')
        localStorage.removeItem('role')
    }

    return (
        <div style={{marginBottom: "30px"}} className="navbar">
            <div className="navbar__container">
                <div className="navbar__links">
                    <Link to="/posts">Главная</Link>
                    <Link to="/account">Личный кабинет</Link>
                </div>
                {isAuth ? 
                <div className="navbar__links">
                    <div style={{display: "flex", alignItems: "center"}}>Вы: {userName}</div>
                    <MyButton onClick={logout}>Выйти</MyButton>
                </div> : 
                    <Link to="/login">Войти</Link>}
            </div>
        </div>
    );
};

export default Navbar;