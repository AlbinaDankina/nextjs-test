import Head from 'next/head';
import { App } from '../components/app';

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <App />
    </>
  )
}

export default Home;
