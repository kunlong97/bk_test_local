import { useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo } from '@/types/book';
import api from '../../api';
import { isShelf, setShelf } from '@/utils/shelf';
import { Button, Toast } from '@/bases';

const DetailFooter: React.FC = () => {
  const id = useParams().id as string;
  const { data } = useRequest<IBookInfo[]>({ url: api.getBook(id) });

  const [shelfMode, setShelfMode] = useState<boolean>(isShelf(data![0].bookId));
  const navigate = useNavigate();

  const onShelf = () => {
    const msg = setShelf(data![0]);
    Toast.show(msg);   //加入书架后弹窗提示Toast组件 
    setShelfMode(!shelfMode);
  };

  const onRead = () => {
    navigate(`/book/${id}/1`);
  }

  return (
    <div className={styles.footer}>

      <Button block color="primary" onClick={onRead}>Start Reading</Button>

      <div className={cx(styles.icon, { [styles.active]: shelfMode })} onClick={onShelf}>
        <i className="icon-book" />
        <p>Add to bookshelf</p>
      </div>
    </div>
  );
};

export default DetailFooter;
