import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useI18n } from 'next-localization';

import { getNextQueryParam } from '@woodshed/utils';

import { AppLayout } from '../../components';

import {
    getStaticPropsForLanguages,
    getStaticPathsForLocales,
    useUser,
} from '../../utils';

const App = (): JSX.Element | null => {
    const router = useRouter();
    const i18n = useI18n();
    const { user } = useUser({
        redirectToWhenFound: null,
        redirectToWhenNotFound: '/',
    });

    const didResetPassword = getNextQueryParam(
        router.query,
        'did-reset-password',
    );

    useEffect(() => {
        if (didResetPassword === 'true') {
            toast(i18n.t('app.index.didResetPassword'));
        }
    }, [didResetPassword]);

    if (!user) {
        return null;
    }

    return (
        <AppLayout title={i18n.t('app.index.title')} navItems={[]} user={user}>
            <div>User email: {user.email}</div>;
            <div>More content goes here</div>;
        </AppLayout>
    );
};

export const getStaticPaths = getStaticPathsForLocales;
export const getStaticProps = getStaticPropsForLanguages;

export default App;
