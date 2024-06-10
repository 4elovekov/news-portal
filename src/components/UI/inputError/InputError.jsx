import React from 'react';
import classes from './InputError.module.css';

const InputError = ({children, ...props}) => {
    return (
        <p {...props} className={classes.inputError}>
            {children}
        </p>
    );
};

export default InputError;