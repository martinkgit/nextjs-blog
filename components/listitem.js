import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function ListItem(allPostsData){
    return(
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>Blog</h2>
    <div className={utilStyles.table}>
    <ul className={utilStyles.list}>
      {allPostsData.map(({ id, date, title }) => (
        
        <li className={utilStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>
          <a className={utilStyles.listText}>{title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
        
      </li>
      
      ))}
    </ul>
    </div>
  </section>
    );
}