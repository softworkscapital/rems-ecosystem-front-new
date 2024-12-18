import React from 'react';
import { Card } from 'react-bootstrap';

const MonthlyExpectedContributions = () => {
    const expected = 20000;
    const achieved = 14000;
    const progress = (achieved / expected) * 100;

    return (
        <Card className="mb-3">
            <Card.Body className="text-start">
                <Card.Title>Monthly Expected Contributions</Card.Title>
                
                <p className="mb-1">Expected: ${expected}</p>
                <p className="mb-1">Achieved: ${achieved}</p>
                
                <div className="progress mt-3">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {progress.toFixed(0)}%
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MonthlyExpectedContributions;