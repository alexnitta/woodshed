import { NextPage } from 'next';

import { Button } from '@woodshed/components';
import { addThousandsSeparator } from '@woodshed/utils';

const IndexPage: NextPage = () => {
    return (
        <div>
            <p>Hello, world.</p>
            <Button
                onClick={() => {
                    // eslint-disable-next-line no-alert
                    alert('You clicked a button.');
                }}
            >
                I am a button.
            </Button>
            <p>
                Here is the output of an imported utility function:{' '}
                {addThousandsSeparator('1000')}
            </p>
        </div>
    );
};

export default IndexPage;
