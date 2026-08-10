import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Space, ErrorBlock } from '@/bases';
import Loading from '@/components/loading';
import { TPageKey, IBookListData } from '@/pages/bookList/types';
import api from '@/pages/bookList/api';
import { px2rem } from '@/utils/unit';
import styles from './index.module.scss';
import NavBar from '@/bases/nav-bar';
import InfiniteScroll from '@/bases/infinite-scroll';
import BookCover from '@/components/bookCover/bookCover';
import useInfiniteRequest from '@/hooks/useRequest/useInfiniteRequest';
import { TITLE_KEY_MAP } from './constant';

const BookList: React.FC = () => {
  const pageKey = useParams().key as TPageKey;
  const navigate = useNavigate();

  const { data, error, size, setSize, isValidating } = useInfiniteRequest<IBookListData>({
    url: api.getBookList(pageKey),
  });
  const hasMore = React.useMemo(() => !data?.at(-1)?.isLast, [data]); // 取最后一个元素

  const loadMore = async () => {
    if (isValidating) return;
    await setSize(size + 1);
  };

  const onBack = () => {
    navigate(-1);
  };

  if (error || !TITLE_KEY_MAP[pageKey]) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.bookList}>
      <NavBar onBack={onBack}>{TITLE_KEY_MAP[pageKey]}</NavBar>
      <div className={styles.content}>
        <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
          <Grid columns={1} gap={px2rem(24)}>
            {data?.map((item) => {
              return item.bookList.map((book) => (
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
              ));
            })}
          </Grid>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default BookList;
