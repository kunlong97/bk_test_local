import React from 'react';
import RankingHeader from './components/header';
import styles from './index.module.scss';
import RankingContent from './components/content';
import useRequest from '@/hooks/useRequest/useRequest';
import api from './api';
import { ErrorBlock } from '@/bases';
import Loading from '@/components/loading';

const Ranking: React.FC = () => {
  const { data, error } = useRequest({ url: api.ranking });

  if (error) {
    return <ErrorBlock />;
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.ranking}>
      <RankingHeader />
      <RankingContent />
    </div>
  );
};

export default Ranking;
