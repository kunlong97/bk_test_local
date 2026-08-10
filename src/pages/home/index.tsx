import Header from './components/header';
import styles from './index.module.scss';
import useRequest from '@/hooks/useRequest/useRequest';
import api from './api';
import Loading from '@/components/loading';
import { ErrorBlock, Image, Swiper } from '@/bases';
import { IHomeData } from './types';
import Navbar from './components/navbar';
import Space from '@/bases/space';
import { px2rem } from '@/utils/unit';
import Popular from './components/popular';
import Recommend from './components/recommend';
import LimitedReader from './components/limitedReade';
import Ranking from '@/pages/home/components/ranking';

export default function Home() {

  //获取轮播图数据
  const { data, error } = useRequest<IHomeData>({ url: api.getHomeData });

  if (error) {
    console.log('错误');
    return <ErrorBlock />;
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <Space direction="vertical" gap={px2rem(20)}>
        <Swiper autoplay loop style={{ '--border-radius': '12px', '--height': '200px' }}>
          {data!.banner.map((item, index) => {
            return (
              <Swiper.Item key={index}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center', // 居中裁剪
                    }}
                  />
                </div>
              </Swiper.Item>
            );
          })}
        </Swiper>
        <Navbar />
        <Popular />
        <Recommend />
        <LimitedReader />
        <Ranking />
      </Space>
    </div>
  );
}
