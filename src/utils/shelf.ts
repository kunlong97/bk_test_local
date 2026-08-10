import { IBookInfo } from '@/types/book';
import storage from './storage';

// 判断指定书籍是否已在书架或书架分组中
export const isShelf = (id: string): boolean => {
  const shelfBooks: IBookInfo[] = storage.get('shelf');
  const groupBooks = storage.get('shelf-group');

  const groupBooksArr = Object.values(groupBooks).flat() as IBookInfo[];   //取出对象的属性值,转换成一维数组
  const arr:IBookInfo[] = [...shelfBooks, ...groupBooksArr];

  if (arr === null) {
    // localStorage里没有记录
    return false;
  }
  const index = arr.findIndex((item) => item.bookId === id);

  if (index !== -1) {
    return true;
  }
  return false;
};

// 加入书架或从书架移除的方法
export const setShelf = (value: IBookInfo) => {
  const arr: IBookInfo[] = storage.get('shelf') || [];
  const index = arr.findIndex((item) => item.bookId === value.bookId);

  // 已在书架,就不重复添加,改为移除书籍
  if (index !== -1) {
    arr.splice(index, 1);
    storage.set('shelf', arr);
    return 'Removed from the bookshelf';
  }

  //否则,加入书架
  arr.unshift(value);
  storage.set('shelf', arr);
  return 'Added to bookshelf';
};

export const deleteShelf = (books: IBookInfo[]) => {
  let arr: IBookInfo[] = storage.get('shelf') || [];

  books.forEach((book) => {
    const index = arr.findIndex((item) => item.bookId === book.bookId);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  });

  storage.set('shelf', arr);

  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'shelf' } }));
};

export const deleteShelfGroup = (groupList: string[]) => {
  let group: Record<string, IBookInfo[]> = storage.get('shelf-group') || {};

  groupList.forEach((groupName) => {
    if (group[groupName]) {
      delete group[groupName];
    }
  });

  storage.set('shelf-group', group);

  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'shelf-group' } }));
};

//添加分组
export const setGroup = (name: string, books: IBookInfo[], groups: string[]) => {
  // 参数验证
  if (!name?.trim()) {
    throw new Error('分组名称不能为空');
  }

  // 获取数据
  let group: Record<string, IBookInfo[]> = storage.get('shelf-group') || {};
  const groupBooks: IBookInfo[] = [];

  // 过滤掉目标分组，避免不必要的删除和重建
  const groupsToMerge = groups.filter((g) => g !== name);

  // 合并分组
  groupsToMerge.forEach((groupName) => {
    if (group[groupName]?.length > 0) {
      groupBooks.push(...group[groupName]);
    }
    delete group[groupName];
  });

  // 合并所有书籍并去重
  const allBooks = [...(group[name] || []), ...groupBooks, ...books];
  const uniqueBooks = Array.from(new Map(allBooks.map((book) => [book.bookId, book])).values());
  group[name] = uniqueBooks;

  // 保存数据
  storage.set('shelf-group', group);

  // 删除所有被移动的书籍（包括从其他分组和新增的）
  const allMovedBooks = [...groupBooks, ...books];
  if (allMovedBooks.length > 0) {
    deleteShelf(allMovedBooks);
  }

  // 触发更新事件
  window.dispatchEvent(
    new CustomEvent('local-storage', {
      detail: { key: 'shelf-group' },
    }),
  );

  // 返回详细信息
  return {
   movedBooks: allMovedBooks,
   msg: '已添加至分组',
  }
};
