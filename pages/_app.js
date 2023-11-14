import Layout from '@/components/layout/layout';
import Head from 'next/head';
import { NotificationContextProvider } from '@/store/notificationContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <NotificationContextProvider>
            <Head>
                <title>Next Events</title>
                <meta name="description" content="Next JS Fullstack events app"></meta>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    );
}
