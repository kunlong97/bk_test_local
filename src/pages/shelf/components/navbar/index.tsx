import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/store/store1';

import styles from './index.module.scss';
import { setEditMode, setGroupVisibleMode } from '../../shelfSlice';
import NavBar from '@/bases/nav-bar';

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const editMode = useAppSelector<boolean>((state) => state.Shelf.editMode);

  const onBack = () => {
    if(editMode){
      dispatch(setEditMode(!editMode));
      dispatch(setGroupVisibleMode(false));     
    }
    navigate('/');
  };

  const onEdit = () => {
    dispatch(setEditMode(!editMode));
    dispatch(setGroupVisibleMode(false));
  };

  return (
    <NavBar
      onBack={onBack}
      right={
        <div className={styles.right} onClick={onEdit}>
          {editMode ? '完成' : '编辑'}
        </div>
      }
    >
      我的书架
    </NavBar>
  );
});

export default Header;
