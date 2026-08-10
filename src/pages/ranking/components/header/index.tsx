import React from 'react';
import NavBar from '@/bases/nav-bar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { Tabs } from '@/bases';
import { rankingActions } from '@/pages/ranking/rankingSlice';
import { TABS } from '../../constants';

const RankingHeader: React.FC = React.memo(() => {
  const naviagte = useNavigate();
  const selectedTabKey = useAppSelector<string>((state) => state.ranking.activeTabKey);
  const dispatch = useAppDispatch();

  // 返回到上一页
  const onBack = () => {
    naviagte(-1);
  };

  const onTab = (key: string) => {
    dispatch(rankingActions.setTabKey(key));
  };

  return (
    <NavBar onBack={onBack} leftText="返回">
      <Tabs activeKey={selectedTabKey} onChange={onTab}>
        {TABS.map((item) => {
          return <Tabs.Tab key={item.key} title={item.name} />;
        })}
      </Tabs>
    </NavBar>
  );
});

export default RankingHeader;
