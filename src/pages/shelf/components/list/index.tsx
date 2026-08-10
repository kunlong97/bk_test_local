import { memo } from 'react';
import styles from './index.module.scss';
import { Grid } from '@/bases';
import { px2rem } from '@/utils/unit';
import BookList from './components/bookList';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IBookInfo } from '@/types/book';
import GroupList from './components/groupList';

const List = memo(function List() {
  const bookList = useReadLocalStorage<IBookInfo[]>('shelf') || [];

  return (
    <div className={styles.list}>
      <Grid columns={3} gap={px2rem(20)}>
        <GroupList />
        <BookList bookList={bookList} />
      </Grid>
    </div>
  );
});

export default List;
