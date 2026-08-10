import React from 'react';
import styles from './index.module.scss';
import { Card, Grid } from '@/bases';
import useRequest from '@/hooks/useRequest/useRequest';
import api from '../../api';
import { IHomeData } from '../../types';
import { px2rem } from '@/utils/unit';
import { useNavigate } from 'react-router-dom';
import BookCover from '@/components/bookCover/bookCover';
import Space from '@/bases/space';

const Recommend: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const onHeaderClick = () => {
    navigate('/book-list/popular');
  };

  const { data } = useRequest<IHomeData>({ url: api.getHomeData }); //获取请求数据

  const renderContent = () => {
    return data?.recommend.map((book) => {
      return (
        <React.Fragment key={book.bookId}>
          <Grid.Item onClick={() => navigate(`/book/${book.bookId}`)}>
            <BookCover src={book.coverImg} alt={book.title} />
            <Space direction="vertical" gap={px2rem(6)}>
              <div className={styles.bookName}>{book.title}</div>
              <div className={styles.author}>{book.author}</div>
            </Space>
          </Grid.Item>
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles.recommend}>
      <Card title="今日推荐" extra="更多" onHeaderClick={onHeaderClick} headerClassName={styles.header}>
        <Grid columns={4} gap={px2rem(16)}>
          {renderContent()}
        </Grid>
      </Card>
    </div>
  );
});

export default Recommend;
