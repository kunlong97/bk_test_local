import React, { useState } from 'react';
import styles from './index.module.scss';
import Sidebar from '@/bases/sidebar';
import useRequest from '@/hooks/useRequest/useRequest';
import { IRanking } from '../../types';
import api from '../../api';
import { TAB_DEFAULT_KEY } from '../../constants';
import SidebarItem from '@/bases/sidebar/sidebar-item';
import BookList from '@/pages/ranking/components/booklist';
import { useAppSelector } from '@/store/store1';

const RankingContent: React.FC = React.memo(() => {
  const { data } = useRequest<IRanking>({ url: api.ranking });
  const selectorTabKey = useAppSelector<'male' | 'female'>((state) => state.ranking.activeTabKey as 'male' | 'female');
  const [activeKey, setActiveKey] = useState<string>(data![TAB_DEFAULT_KEY][0].key); // 默认值为male的第一个元素的key属性的值
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.rankingContent}>
      <Sidebar activeKey={activeKey} onChange={onChange}>
        {data![selectorTabKey].map((item) => {
          return (
            <SidebarItem key={item.key} title={item.shortTitle}>
              <BookList id={item.key} gender={selectorTabKey} />
            </SidebarItem>
          );
        })}
      </Sidebar>
    </div>
  );
});

export default RankingContent;
