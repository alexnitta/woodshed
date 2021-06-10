import { NextPage } from 'next';

import { Button } from '@woodshed/components';
import { addThousandsSeparator } from '@woodshed/utils';

const IndexPage: NextPage = () => {
    return (
        <div className="App">
            <h1>@woodshed/web-next</h1>
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
};

export default IndexPage;
