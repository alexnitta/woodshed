import React from 'react';

import { Button } from '@woodshed/components';
import { addThousandsSeparator } from '@woodshed/utils';

import './App.css';

function App(): JSX.Element {
    return (
        <div className="App">
            <h1>@woodshed/web-cra</h1>
            <Button
                onClick={() => {
                    // eslint-disable-next-line no-alert
                    alert('You clicked a button.');
                }}
            >
                This is an imported component.
            </Button>
            <p>
                This is the output of an imported utility function:{' '}
                {addThousandsSeparator('1000')}
            </p>
        </div>
    );
}

export default App;
