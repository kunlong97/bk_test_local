import { memo, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Dialog, Grid, Popup, Toast } from '@/bases';
import { useAppSelector } from '@/store/store1';
import cx from 'classnames';
import { IBookInfo } from '@/types/book';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import Input, { InputRef } from '@/bases/input';
import { deleteShelf, deleteShelfGroup, setGroup } from '@/utils/shelf';
import { useAppDispatch } from '@/store';
import { clearSelectedBook, clearSelectedGroup, setEditMode, setGroupVisibleMode } from '../../shelfSlice';

const EditBar: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector<boolean>((state) => state.Shelf.editMode);
  const selectedBook = useAppSelector<IBookInfo[]>((state) => state.Shelf.selectedBook);
  const selectedGroup = useAppSelector<string[]>((state) => state.Shelf.selectedGroup);
  const groupVisibleMode = useAppSelector<boolean>((state) => state.Shelf.groupVisibleMode);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<InputRef>(null);

  const isDisabled = selectedBook.length === 0 && selectedGroup.length === 0; //没有选中任何书籍或分组

  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || {};

  // 点击「分组至」打开分组选择弹窗若未选中任何内容则直接返回
  const onShowGroup = () => {
    // if (isDisabled) return;
    dispatch(setGroupVisibleMode(true));
  };

  // 点击「新建分组」：关闭分组选择弹窗，打开新建分组确认弹窗
  const onCreateGroup = () => {
    setDialogVisible(true);
    dispatch(setGroupVisibleMode(false));
  };

  // 点击取消：清空输入值、关闭弹窗、清空 Input 组件内部状态
  const onCancelDialog = () => {
    setInputValue('');
    setDialogVisible(false);
    inputRef.current!.clear();
  };

  // 点击提交: 清空输入值、关闭弹窗、清空 Input 组件内部状态、清除选中的书籍和分组
  const onConformDialog = () => {
    setInputValue('');
    setDialogVisible(false);
    inputRef.current!.clear();
    const result = setGroup(inputValue, selectedBook, selectedGroup);
    Toast.show(result.msg);
    dispatch(clearSelectedBook());
    dispatch(clearSelectedGroup());
  };

  // 分组
  const onGroup = (name: string) => {
    if (selectedBook.length === 0 && selectedGroup.length === 0) {
      Toast.show('请选择书籍或分组');
    } else {
      const result = setGroup(name, selectedBook, selectedGroup);
      Toast.show(result.msg);
      //接着要清除选中的书籍和分组
      dispatch(clearSelectedBook());
      dispatch(clearSelectedGroup());
      setGroupVisibleMode(false);
    }
  };

  // 点击「删除」:
  const onDelete = () => {
    if (isDisabled) return;
    deleteShelf(selectedBook);
    deleteShelfGroup(selectedGroup);
    dispatch(clearSelectedBook());
    dispatch(clearSelectedGroup());
    dispatch(setEditMode(false));
    Toast.show('删除成功');
  };

  return (
    <div className={styles.editBar}>
      <Popup visible={editMode} position="bottom" mask={false}>
        <Grid columns={2}>
          <Grid.Item onClick={onShowGroup}>
            <div className={cx(styles.item, { [styles.disable]: isDisabled })}>分组至</div>
          </Grid.Item>
          <Grid.Item onClick={onDelete}>
            <div className={cx(styles.item, { [styles.disable]: isDisabled })}>删除</div>
          </Grid.Item>
        </Grid>

        <Popup className={styles.group} visible={groupVisibleMode} position="bottom">
          <div className={styles.groupTitle}>书籍分组</div>
          <div className={styles.groupAdd} onClick={onCreateGroup}>
            <i className="icon-add" />
            <div>新建分组</div>
          </div>
          <div className={styles.groupList}>
            {Object.keys(groupList).map((name) => (
              <div className={styles.groupItem} key={name}>
                <i className="icon-folder" />
                <div className={styles.groupName} onClick={() => onGroup(name)}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </Popup>
      </Popup>

      <Dialog
        visible={dialogVisible}
        content={
          <>
            <h2>新建分组</h2>
            <div className={styles.input}>
              <Input value={inputValue} onChange={setInputValue} ref={inputRef} />
            </div>
          </>
        }
        actions={[
          { key: 'cancel', text: '取消', onClick: onCancelDialog },
          { key: 'confirm', text: '提交', color: 'primary', onClick: onConformDialog },
        ]}
      ></Dialog>
    </div>
  );
});

export default EditBar;
