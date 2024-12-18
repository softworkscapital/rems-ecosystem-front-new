import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;