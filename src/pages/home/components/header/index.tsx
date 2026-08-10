import styles from './index.module.scss';
import { Link } from 'react-router-dom';

export default function Header() {

  


  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1>慕课书城</h1>
      </div>
      <div className={styles.right}>
        <Link to={'/search'}>
          <i className="icon-search"></i>
        </Link>
        <Link to={'/shelf'}>
          <i className="icon-shelf"></i>
        </Link>
      </div>
    </div>
  );
}
