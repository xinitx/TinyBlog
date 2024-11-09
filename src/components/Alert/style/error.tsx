import React from 'react';
import './error.less';
//覆盖颜色
const ErrorAlert = ({ primary, secondary }) => {
    return (
        <div
            className="error-icon"
            style={{
                '--primary-color': primary || '#ff4b4b',
                '--secondary-color': secondary || '#fff',
            }}
        />
    );
};

export default ErrorAlert;