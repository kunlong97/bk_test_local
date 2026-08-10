import { IBookInfo } from '@/types/book';

export interface IBookListData {
  bookList: IBookInfo[];
  isLast: boolean;   //是否是最后一条数据
}

export type TPageKey =
  | '001'
  | '002'
  | '003'
  | '004'
  | '005'
  | '006'

export type TTtileKeyMap = Record<TPageKey, string>;
