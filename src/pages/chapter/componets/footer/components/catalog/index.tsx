import { Popup } from '@/bases';
import BookCatalogList from '@/components/bookCatalogList';
import useRequest from '@/hooks/useRequest/useRequest';
import { setCatalogVisible } from '@/pages/chapter/chapterSlice';
import api from '@/pages/detail/api';
import { useAppDispatch, useAppSelector } from '@/store/store1';
import { IBookInfo } from '@/types/book';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChapterFooterCatalog: React.FC = React.memo(() => {

  const navigate = useNavigate();

  const { bookId } = useParams();
  const { data } = useRequest<IBookInfo[]>({ url: api.getBook(bookId as string) });

  const dispatch = useAppDispatch();
  const catalogVisible = useAppSelector<boolean>((state) => state.Chapter.catalogVisible);

  const onMaskClick = () => {
    dispatch(setCatalogVisible(false));
  };

  //跳转到指定章节
  const onClickChapter = (chapter:number) => {
    navigate(`/book/${bookId}/${chapter}`, {replace: true});
    dispatch(setCatalogVisible(false));
  }

  return (
    <Popup visible={catalogVisible} position="left" onMaskClick={onMaskClick}>
      {data && (
        <BookCatalogList
          catalogList={data?.[0]?.chapters!}
          author={data?.[0]?.author!}
          title={data?.[0]?.title!}
          imgUrl={data?.[0]?.coverImg}
          bookId={data?.[0]?.bookId}
          onClickChapter={onClickChapter}
        />
      )}
    </Popup>
  );
});

export default ChapterFooterCatalog;
