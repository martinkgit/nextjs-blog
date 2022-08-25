import Layout from '../../components/layout';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';

var images = ['/images/image 5.png',
'/images/image 6.png',
'/images/image 7.png'];
var index = 0;


export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.id);
  return {
    props: {
      postData, allPostsData
    },
  }; 
}

export function rightImage(postTitle){
if(postTitle==='Placeholder blog'){
  return images[1];
}
if(postTitle==='Two Forms of Pre-rendering'){
  return images[0];
}
if(postTitle==='When to Use Static Generation v.s. Server-side Rendering'){
  return images[2];
}
}


export function getImages(){
  index++;
  index = index % images.length;
  return( images[index]
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData, allPostsData }) {
    return (
      <div className={utilStyles.containerBlog}>
      
      <Layout>
          <section>
        <div className= {utilStyles.containerImage}>
        <Image
                  priority
                  src={rightImage(postData.title)}
                  className={utilStyles.image}
                  height={143}
                  width={421}
                />
         </div>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <div >
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.dateText}>
            <Date dateString={postData.date} />
          </div>
          <div className={utilStyles.blogText} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        </div>
        <br></br>

        <div className={utilStyles.lineBlog}></div>

        <h3 className={utilStyles.headingLgPost}>Muut postaukset</h3>
        <ul className={utilStyles.tablePost}>
          {allPostsData?.map(({ id, date, title }) => (
            
            <li className={utilStyles.container} key={id}>
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
              <a className={utilStyles.listText}>{title}</a>
            </Link>
            <br></br>
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          
          ))}
        </ul>
        </section>
        
        <div className={utilStyles.rectangleBlog} >
      <h3 className={utilStyles.headingBgBlog}>Blogipostaukset</h3>
      <div className={utilStyles.bottomListContainerBlog}>
      <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className={utilStyles.listBlog}>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.whiteTextBlog}>{title}</a>
            </Link>
          </li>
          ))}
        </ul>
        </div>
          <h1 className={utilStyles.headingBottomBlog}>Alaotsikko</h1>
          <p className={utilStyles.bottomLinkBlog}>Lorem ipsum</p>
          </div>
      </Layout>

      
      </div>
    );
  }