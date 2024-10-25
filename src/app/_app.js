 import Layout from '../../src/app/Components/Layout/layout'; // Your layout component

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;