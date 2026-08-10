import React from 'react';
import styles from './index.module.scss';
import { Space } from '@/bases';
import { px2rem } from '@/utils/unit';
import BookCover from '@/components/bookCover/bookCover';
import { useParams } from 'react-router-dom';
import useRequest from '@/hooks/useRequest/useRequest';
import api from '@/pages/detail/api';
import { IBookInfo } from '@/types/book';
import Ellipsis from '@/bases/ellipsis';

const DetailBookInfo: React.FC = React.memo(() => {
  const id = useParams().id as string;
  const { data } = useRequest<IBookInfo[]>({ url: api.getBook(id) });

  //useRequest 是一个异步 Hook，在数据请求完成之前，data 的初始值就是 undefined。直接访问了 data[0]，可能会导致运行时错误和类型检查警告。
  if (!data || data.length === 0) {
    return null;
  }
  const series = data[0]?.isSerial ? 'Ongoing' : 'Completed';

  return (
    <div className={styles.bookInfo}>
      <Space gap={px2rem(12)}>
        <BookCover
          src={data[0].coverImg}
          alt={data[0].title}
          style={{ '--width': px2rem(84), '--height': px2rem(112) }}
        />
        <Space direction="vertical" justify="center" gap={px2rem(10)}>
          <div className={styles.bookName}>{data[0].title}</div>
          <div className={styles.author}>{data[0].author}</div>
          <div className={styles.category}>{data[0].categoryName}</div>
          <div className={styles.meta}>
            {data[0].wordCount} million words / {series}
          </div>
        </Space>
      </Space>
      <div className={styles.desc}>
        <Ellipsis text={data[0].desc} rows={2} expand="展开" collapse="收起" />
      </div>
    </div>
  );
});

export default DetailBookInfo;
