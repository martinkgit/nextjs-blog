import '../styles/global.css';
import utilStyles from '../styles/utils.module.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.getElementById("__next").className = utilStyles.containerNext;
  }, []);
    return <Component {...pageProps} />;
  }