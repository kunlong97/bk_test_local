import styles from './index.module.scss';
import { Grid, Popup } from '@/bases';
import BookCover from '@/components/bookCover/bookCover';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { setSelectedGroup } from '@/pages/shelf/shelfSlice';
import { useAppDispatch } from '@/store';
import { useAppSelector } from '@/store/store1';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';
import { memo, useState } from 'react';
import cx from 'classnames';
import BookList from '../bookList';

const GroupList: React.FC = memo(() => {
  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || [];

  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.Shelf.editMode);
  const selectedGroup = useAppSelector((state) => state.Shelf.selectedGroup);

  const [visible, setVisible] = useState<boolean>(false); //控制底部分组框的显示与隐藏
  const [bookList, setBookList] = useState<IBookInfo[]>([]); //存储当前分组框中要展示的书籍列表（点击某个分组后填充此数据）

  const onGroup = (groupName: string) => {
    // "编辑"模式,点击分组,选中/删除分组
    if (editMode) {
      dispatch(setSelectedGroup(groupName));

    // 非"编辑"模式,点击分组,弹出分组框,将该分组下的书籍列表传入
    } else {
      setVisible(true);
      setBookList((groupList as Record<string, IBookInfo[]>)[groupName] || []);
    }
  };

  // 判断分组是否被选中
  const getGroupActive = (groupName: string) => {
    return selectedGroup.includes(groupName);
  };

  return (
    <>
      {Object.keys(groupList).map((groupName: string) => {
        return (
          <Grid.Item key={groupName} onClick={() => onGroup(groupName)}>
            <div className={styles.group}>
              <Grid columns={2} gap={px2rem(5)}>
                {(groupList as Record<string, IBookInfo[]>)[groupName]?.map((book) => (
                  <Grid.Item key={book.bookId}>
                    <BookCover
                      src={book.coverImg}
                      alt={book.title}
                      style={{ '--width': px2rem(40), '--height': px2rem(57) }}
                    />
                  </Grid.Item>
                ))}
              </Grid>
              {editMode && (
                <i className={cx('icon-selector', styles.icon, { [styles.active]: getGroupActive(groupName) })} />
              )}
            </div>
            <div className={styles.groupName}>{groupName}</div>
          </Grid.Item>
        );
      })}
      <Popup visible={visible} position="bottom" className={styles.groupPopup} onMaskClick={() => setVisible(false)}>
        <Grid columns={3} gap={px2rem(20)}>
          <BookList bookList={bookList} />
        </Grid>
      </Popup>
    </>
  );
});

export default GroupList;
