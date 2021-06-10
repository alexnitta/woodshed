import React, { useState } from 'react';

import { ClickCountButton } from '@woodshed/components';
import { addThousandsSeparator } from '@woodshed/utils';

import './App.css';

const App = (): JSX.Element => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="App">
            <h1>@woodshed/web-cra</h1>
            <ClickCountButton setCount={setCount}>Click me</ClickCountButton>
            <p>{`You have clicked the button ${count} times`}</p>

            <p>
                This is the output of an imported utility function:{' '}
                {addThousandsSeparator('1000')}
            </p>
        </div>
    );
};

export default App;
