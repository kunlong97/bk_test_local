import styles from './index.module.scss';
import BookSearchBar from './components/searchBar';
import SearchList from './components/searchList';
import SearchHot from './components/searchHot';
import SearchHistory from './components/searchHistory';
import { createReducer } from '@/pages/search/store';
import { useReducer } from '@/store';
import React from 'react';

export default function Search() {
  
  const { reducers } = React.useMemo(() => createReducer('search'), []);
  useReducer(reducers);

  return (
    <div className={styles.search}>
      <BookSearchBar />
      <SearchHot />
      <SearchHistory />
      <SearchList />
    </div>
  );
}
