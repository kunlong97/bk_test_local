import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import useRequest from '@/hooks/useRequest/useRequest';
import { IBookInfo, IChapterInfo } from '@/types/book';
import api from '../../api';

const DetailContent: React.FC = () => {
  const id = useParams().id as string;
  const { data: IBookInfo } = useRequest<IBookInfo[]>({ url: api.getBook(id) });
  const { data: IChapterInfo } = useRequest<IChapterInfo>({ url: api.getChapterInfo });

  if (IBookInfo === null || IBookInfo === undefined) return null;
  if (IChapterInfo === null || IChapterInfo === undefined) return null;

  return (
    <div className={styles.detailContent}>
      <h1>{IBookInfo[0].chapters![0]}</h1>
      {IChapterInfo.content.map((item) => {
        return <p key={item}>{item}</p>;
      })}
    </div>
  );
};

export default DetailContent;
