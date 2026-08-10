import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '@/bases/nav-bar';
import useRequest from '@/hooks/useRequest/useRequest';
import api from '@/pages/detail/api';
import { IBookInfo } from '@/types/book';

const DetailNavbar: React.FC = React.memo(() => {

  const wrapRef = useRef<HTMLDivElement>(null);
  const [fixedMode, setFixedMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const id = useParams().id as string;
  const { data } = useRequest<IBookInfo[]>({ url: api.getBook(id) });

  //返回上一页
  const onBack = () => {
    navigate(-1);
  };

  const onScroll = (e: Event) => {
    const offsetY = (e.target as HTMLElement).scrollTop || window.pageYOffset || document.body.scrollTop;

    //判断滚动条滚过的距离是否大于Navbar的高度
    if (offsetY > wrapRef.current!.offsetHeight) {
      setFixedMode(true);
    } else {
      setFixedMode(false);
    }
  };

  //绑定滚动事件
  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return (
    <div className={styles.navBar} ref={wrapRef}>
      <NavBar onBack={onBack} style={{ background: fixedMode ? '#fff' : 'null' }}>
        {fixedMode ? data?.[0]?.title : null}
      </NavBar>
    </div>
  );
});

export default DetailNavbar;
