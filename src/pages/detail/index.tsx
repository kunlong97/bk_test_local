import useRequest from '@/hooks/useRequest/useRequest';
import React from 'react'
import { useParams } from 'react-router-dom'
import api from './api';
import Loading from '@/components/loading';
import { ErrorBlock } from '@/bases';
import DetailHeader from './components/detailHeader';
import { IBookInfo } from '@/types/book';
import DetailContent from './components/detailContent';
import DetailFooter from './components/detailFooter';

const Detail:React.FC = () => {

  const id = useParams().id as string;
  const {data, error} = useRequest<IBookInfo>({url: api.getBook(id)});

  if(!data){
    return <Loading />
  }
  if(error){
    return <ErrorBlock />
  }

  return(
    <>
      <DetailHeader/>
      <DetailContent />
      <DetailFooter />
    </>
  )
}

export default Detail;  