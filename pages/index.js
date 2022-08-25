import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData} from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image';

var images = ['/images/image 5.png',
'/images/image 6.png',
'/images/image 7.png'];
var index = 0;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
     
    },
  };
}

function addProductJsonLd() {
  return {
    __html: `{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Executive Anvil",
    "description": "Just some content to show that this can be done",
    "sku": "0446310786",
    "mpn": "925872",
    "brand": {
      "@type": "Brand",
      "name": "ACME"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Fred Benson"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.4",
      "reviewCount": "89"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://example.com/anvil",
      "priceCurrency": "USD",
      "price": "119.99",
      "priceValidUntil": "2020-11-20",
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock"
    }
  }
`,
  };
}





export function getImages(){
  index++;
  index = index % images.length; 
  return( images[index]
  )
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Welcome to my blog"
          key="desc"
        />
         <meta
          property="og:title"
          content="Martins blog"
        />
         <meta
          property="og:description"
          content="This is a sample blog made with Next.js"
        />
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
        
      </Head>
      <section className={utilStyles.headingHd}>
        <p>Hello, I'm Martin and I study computer science in University of Eastern Finland</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>

        <div className={utilStyles.line}></div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.table}>
          {allPostsData.map(({ id, date, title }) => (
            
            <li className={utilStyles.containerIndex} key={id}>
              <Link href={`/posts/${id}`}>
              <a>
                <Image
                  priority
                  src={getImages()}
                  height={90}
                  width={132}
                  alt={title}
                />
              </a>
              </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.listTextIndex}>{title}</a>
            </Link>
            <br></br>
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          
          ))}
        </ul>
        
      </section>

      

     
      <div className={utilStyles.rectangle} >
     
      
      <h3 className={utilStyles.headingBg}>Blogipostaukset</h3>
      <div className={utilStyles.bottomListContainer}>
      <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className={utilStyles.listHome}>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.whiteText}>{title}</a>
            </Link>
          </li>
          ))}
        </ul>
        </div>
        <h1 className={utilStyles.headingBottom}>Alaotsikko</h1>
      <p className={utilStyles.bottomLinkIndex}>Lorem ipsum</p>
      </div>
    </Layout>
       
  );
  
}