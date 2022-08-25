import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';



export async function getStaticProps() {
  const postsData = getSortedPostsData();
  return {
    props: {
      postsData,
    },
  };
}

const name = 'Minun blogini';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home, postsData }) {
  return (

    
    
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
        
          <>
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
          
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={108}
              width={108}
              alt={name}
            />
            
          </>
        ) : (
          <>
          <div>
              
            
            <div className={utilStyles.blogImageContainer}>
            <Link href="/">
                <a className={utilStyles.colorInherit}>Martin Kakko</a>
            </Link>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.blogImage}
                  height={20}
                  width={20}
                  alt={name}
                />
              </a>
            </Link>
            </div>
           
      
      </div>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
        
      )}
      
    </div>
    
  );
}