import React, { useEffect } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ErrorBlock, Grid, Space } from '@/bases';
import { px2rem } from '@/utils/unit';
import BookCover from '@/components/bookCover/bookCover';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo } from '@/types/book';
import api from '../../api';
import Loading from '@/components/loading';

const SearchList: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const searchKeyword = useAppSelector<string>((state) => state.search.searchKeyword); //从store中取出searchKeyword
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode); //从store中取出searchMode

  const { data, error, mutate } = useRequest<IBookInfo[]>({
    url: api.getSearchList,
    params: { q: searchKeyword },
  });

  useEffect(() => {
    if (searchKeyword) {
      mutate(); //手动触发请求,重新获取
    }
  }, [mutate, searchKeyword]);

  if (error && searchMode) {
    return <ErrorBlock />;
  }

  if (!data && searchMode) {
    return <Loading />;
  }

  return (
    <div className={cx(styles.searchList, { [styles.hidden]: !searchMode })}>
      <Grid columns={1} gap={px2rem(24)}>
        {data?.map((book) => {
          return (
            <Grid.Item key={book.bookId} onClick={() => navigate(`/book/${book.bookId}`)}>
              <Space gap={px2rem(12)}>
                <BookCover src={book.coverImg} alt={book.title} />
                <Space direction="vertical" justify="between" gap={px2rem(12)}>
                  <div className={styles.bookName}>{book.title}</div>
                  <div className={styles.desc}>{book.desc}</div>
                  <div className={styles.meta}>
                    {book.author}·{book.categoryName}
                  </div>
                </Space>
              </Space>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
});

export default SearchList;
