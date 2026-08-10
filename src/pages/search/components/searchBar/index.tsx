import SearchBar, { SearchBarRef } from '@/bases/search-bar';
import { removeUrlParams, setUrlParams } from '@/utils/url';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setHistory } from '../../utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';
import {searchActions} from '@/pages/search/store';

const BookSearchBar: React.FC = React.memo(() => {
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const searchRef = useRef<SearchBarRef>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //输入框回车键触发事件
  const onSearch = (value: string) => {
    if (!value) return;
    setUrlParams([['keyword', value]], 'search'); //设置或更新 URL 中的查询参数
    setHistory(value);
    dispatch(searchActions.setSearchKeyword(value));
  };

  //点击取消按钮时触发事件
  const onCancel = () => {
    navigate(-1); //返回上一页
  };

  //点击清除图标时触发事件
  const onClear = () => {
    removeUrlParams(['keyword'], '/search');
    dispatch(searchActions.setSearchKeyword(''));
    dispatch(searchActions.setSearchMode(false));
  };

  const onChange = (value: string) => {
    if (!value) {
      removeUrlParams(['keyword'], '/search');
      dispatch(searchActions.setSearchKeyword(''));
      dispatch(searchActions.setSearchMode(false));
    }
  };

  useEffect(() => {
    searchRef.current?.focus(); //自动获取焦点
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      dispatch(searchActions.setSearchMode(true));
      searchRef.current?.setValue(searchKeyword as string); 
    }
  }, [searchKeyword]);

  return (
    <SearchBar
      value={searchKeyword as string}
      placeholder="搜索书籍或作者"
      onSearch={onSearch}
      showCancel={true}
      onCancel={onCancel}
      onClear={onClear}
      onChange={onChange}
    />
  );
});

export default BookSearchBar;
