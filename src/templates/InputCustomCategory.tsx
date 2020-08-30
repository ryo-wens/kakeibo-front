import React, { useEffect, useState, useMemo, useCallback, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GenericButton, TextInput } from '../components/uikit/index';
import {
  fetchCategories,
  addCustomCategories,
  editCustomCategories,
  deleteCustomCategories,
} from '../reducks/categories/operations';
import { getIncomeCategories, getExpenseCategories } from '../reducks/categories/selectors';
import { State } from '../reducks/store/types';
import { AssociatedCategories } from '../reducks/categories/types';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tablePosition: {
      margin:'0 auto'
    },
    tableTitle: {
      textAlign: 'center',
      marginTop: '30px',
    },
    tableSubTitle: {
      textAlign:'left',
      marginLeft:16
    },
    tableMain: {
      maxWidth: 660,
      marginTop: '30px',
      height: 'auto',
      textAlign: 'center',
      border: 'solid 1px #666',
      borderCollapse: 'collapse',
    },
    tableTop: {
      width: 310,
      backgroundColor: '#4db5fa',
      border: 'solid 1px #e1e3e3',
    },
    tableCell: {
      border: 'solid 1px #e1e3e3',
      lineHeight:"initial"
    },
    textSize: {
      fontSize: "0.889rem;"
    },
    root: {
      fontSize:"initial",
    },
    modalPosition: {
      width: 520,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonsPosition: {
      display: 'flex',
    },
  })
);

const InputCustomCategory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const selector = useSelector((state: State) => state);
  const incomeCategories = getIncomeCategories(selector);
  const expenseCategories = getExpenseCategories(selector);
  const isNameInput = name === '';

  const handleOpen =useCallback( (selectedId: number, selectedName: string) => {
    setName(selectedName);
    setId(selectedId);
    setOpen(true);
  },[setName,setId,setOpen])

  const handleClose =useCallback( () => {
    setName('');
    setId(0);
    setOpen(false);
  },[setName,setId,setOpen])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  useEffect(() => {
    if (incomeCategories.length === 0 || expenseCategories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  const deleteCategoryCheck = (id: number, bigCategoryId: number) => {
    if (window.confirm('カテゴリーを削除しても良いですか？ ')) {
      dispatch(deleteCustomCategories(id, bigCategoryId));
    } else {
      alert('カテゴリー削除を中止しました');
    }
  };

  const paths = window.location.pathname.split('/');
  const bigCategoryId = parseInt(paths[paths.length - 1], 10);

  const mediumCategories: AssociatedCategories = useMemo(() => {
    let associatedCategories: AssociatedCategories = [];
    // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
    if (bigCategoryId === 1) {
      for (const incomeCategory of incomeCategories) {
        if (incomeCategory.id === bigCategoryId) {
          associatedCategories = incomeCategory.associated_categories_list;
        }
      }
    } else {
      for (const expenseCategory of expenseCategories) {
        if (expenseCategory.id === bigCategoryId) {
          associatedCategories = expenseCategory.associated_categories_list;
        }
      }
    }
    return associatedCategories;
  }, [incomeCategories, expenseCategories, bigCategoryId]);

  const categoryDisplay = useMemo(() => {
    let nextCategories: ReactElement<AssociatedCategories>[] = [];
    mediumCategories.map((mediumCategory) => {
      if (mediumCategory.category_type === 'MediumCategory') {
        nextCategories = [
          ...nextCategories,
          <TableRow key={mediumCategory.name}>
            <TableCell className={ classes.tableCell } component="th" scope="row">
              {mediumCategory.name}
            </TableCell>
            <TableCell  className={classes.tableCell} align="center">
              <div className={classes.textSize }>
              デフォルトのカテゴリーは編集できません
              </div>
            </TableCell>
          </TableRow>,
        ];
      } else if (mediumCategory.category_type === 'CustomCategory') {
        nextCategories = [
          ...nextCategories,
          <TableRow key={mediumCategory.name}>
            <TableCell className = {classes.tableCell} component="th" scope="row">
              {mediumCategory.name}
            </TableCell>
            <TableCell className = {classes.tableCell} align="center">
              <IconButton
                color="primary"
                size={"small"}
                onClick={() => handleOpen(mediumCategory.id, mediumCategory.name)}
              >
                <CreateIcon className={ classes.root} />
              </IconButton>
              <IconButton
                color="primary"
                size = {"small"}
                onClick={() =>
                  deleteCategoryCheck(mediumCategory.id, mediumCategory.big_category_id)
                }
              >
                <DeleteIcon className={ classes.root} />
              </IconButton>
            </TableCell>
          </TableRow>,
        ];
      }
    });
    return nextCategories;
  }, [mediumCategories]);

  return (
    <>
      <div className={classes.tablePosition}>
      <h3 className={classes.tableTitle}>追加するカテゴリー名を入力してください</h3>
      <TableContainer className={classes.tableMain} component={Paper}>
        <h3 className={classes.tableSubTitle}>追加</h3>
        <TextInput
          label={'追加するカテゴリー名'}
          value={name}
          id={'customCategory'}
          type={'text'}
          fullWidth={false}
          required={false}
          onChange={handleChange}
        />
        <GenericButton
          startIcon={<AddCircleOutlineIcon/>}
          onClick={() => dispatch(addCustomCategories(name, bigCategoryId)) && setName('')}
          label={'追加する'}
          disabled={isNameInput}
        />
        <h3 className={classes.tableSubTitle}>編集</h3>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTop} align="center">
                中カテゴリー
              </TableCell>
              <TableCell className={classes.tableTop} align="center">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >{categoryDisplay}</TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalPosition}>
          <h3>カテゴリー編集</h3>
          <TextInput
            label={'カテゴリー名'}
            id={'editCategory'}
            fullWidth={false}
            required={false}
            type={'text'}
            value={name}
            onChange={handleChange}
          />
          <div className={classes.buttonsPosition}>
            <GenericButton
              label={'編集する'}
              disabled={isNameInput}
              onClick={() => {
                dispatch(editCustomCategories(id, name, bigCategoryId)) && handleClose();
              }}
            />
            <GenericButton  disabled={false} label={'キャンセル'} onClick={handleClose} />
          </div>
        </div>
      </Modal>
      </div>
    </>
  );
};
export default InputCustomCategory;
