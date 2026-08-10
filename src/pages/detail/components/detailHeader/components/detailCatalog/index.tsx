import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Popup, Space } from '@/bases';
import { useParams } from 'react-router-dom';
import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo } from '@/types/book';
import api from '@/pages/detail/api';
import BookCatalogList from '@/components/bookCatalogList';

const Catalog: React.FC = React.memo(() => {
  const [visible, setVisible] = useState<boolean>(false);
  const id = useParams().id as string;
  const { data } = useRequest<IBookInfo[]>({ url: api.getBook(id) });

  if (!data || data === undefined) {
    return null;
  }


  const latestChapters = useMemo(() => {
    return data[0].chapters?.slice(-3).reverse(); //取出最新三章,倒序排列
  }, [data]);

  const onShow = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className={styles.catalog}>
      <Space direction="vertical">
        {latestChapters?.map((name: string) => {
          return (
            <div key={name} className={styles.catalogItem}>
              {name}
            </div>
          );
        })}
      </Space>

      <div className={styles.catalogBtn} onClick={onShow}>
        <div className={styles.icon}>
          <i className="icon-catalog" />
        </div>
        <div>目录</div>
      </div>

      <Popup visible={visible} onMaskClick={onCancel}>
        <BookCatalogList
          catalogList={data[0].chapters!}
          author={data[0].author}
          title={data[0].title}
          imgUrl={data[0].coverImg}
          bookId={data[0].bookId}
        />
      </Popup>
    </div>
  );
});

export default Catalog;
