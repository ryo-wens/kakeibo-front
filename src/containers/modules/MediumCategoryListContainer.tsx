import React, { useEffect } from 'react';
import { Action, Dispatch } from 'redux';
import axios from 'axios';
import {
  addCustomCategories,
  deleteCustomCategories,
  editCustomCategories,
} from '../../reducks/categories/operations';
import {
  addGroupCustomCategories,
  deleteGroupCustomCategories,
  editGroupCustomCategories,
} from '../../reducks/groupCategories/operations';
import { AssociatedCategory, Category } from '../../reducks/categories/types';
import MediumCategoryList from '../../components/modules/category/MediumCategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { getExpenseCategories, getIncomeCategories } from '../../reducks/categories/selectors';
import {
  getGroupExpenseCategories,
  getGroupIncomeCategories,
} from '../../reducks/groupCategories/selectors';

interface MediumCategoryListContainerProps {
  transactionType: string;
  unEditInputForm: boolean;
  bigCategoryId: number;
  bigCategoryIndex: number;
  bigEditCategoryIndex: number | null;
  associatedIndex: number | null;
  bigCategory: string | null;
  associatedCategory: string;
  customCategoryName: string;
  editCustomCategoryName: string;
  mediumCategoryMenuOpen: boolean;
  bigCategoryMenuRef: React.RefObject<HTMLDivElement>;
  mediumCategoryMenuRef: React.RefObject<HTMLDivElement>;
  setTransactionType?: React.Dispatch<React.SetStateAction<string>>;
  setBigCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setAssociatedCategory: React.Dispatch<React.SetStateAction<string>>;
  setCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setEditCustomCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setBigCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setBigCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setMediumCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAssociatedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBigCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMediumCategoryMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediumCategoryListContainer = (props: MediumCategoryListContainerProps) => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const pathName = useLocation().pathname.split('/')[1];
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const groupIncomeCategories = useSelector(getGroupIncomeCategories);
  const groupExpenseCategories = useSelector(getGroupExpenseCategories);

  const handleCloseBigCategoryMenu = (event: Event) => {
    if (
      props.bigCategoryMenuRef.current &&
      !props.bigCategoryMenuRef.current.contains(event.target as Node)
    ) {
      props.setBigCategoryMenuOpen(false);
    }
  };

  const handleCloseMediumCategoryMenu = (event: Event) => {
    if (
      props.mediumCategoryMenuRef.current &&
      !props.mediumCategoryMenuRef.current.contains(event.target as Node)
    ) {
      props.setMediumCategoryMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseMediumCategoryMenu);
    return () => {
      document.removeEventListener('click', handleCloseMediumCategoryMenu);
    };
  }, [handleCloseMediumCategoryMenu]);

  const handleChangeCategory = (
    bigCategoryIndex: number,
    bigCategory: Category | null,
    associatedCategory: AssociatedCategory,
    categoryType: string,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    props.setBigCategoryIndex(bigCategoryIndex);
    props.setAssociatedCategory(associatedCategory.name);
    categoryType === 'bigCategory'
      ? props.setBigCategoryMenuOpen(false)
      : props.setMediumCategoryMenuOpen(false);
    event.stopPropagation();

    if (bigCategory !== null) {
      props.setBigCategoryId(bigCategory.id);
      props.setBigCategory(bigCategory.name);
      props.setTransactionType !== undefined &&
        props.setTransactionType(bigCategory.transaction_type);
    }

    switch (associatedCategory.category_type) {
      case 'MediumCategory':
        props.setMediumCategoryId(associatedCategory.id);
        props.setCustomCategoryId(null);
        break;
      case 'CustomCategory':
        props.setMediumCategoryId(null);
        props.setCustomCategoryId(associatedCategory.id);
        break;
    }
  };

  const handleChangeAddCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setCustomCategoryName(event.target.value);
  };

  const handleChangeEditCustomCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setEditCustomCategoryName(event.target.value);
  };

  const categoryOperationSwitching = (
    operationFunction: (dispatch: Dispatch<Action>) => Promise<void>,
    groupOperationFunction: (dispatch: Dispatch<Action>) => Promise<void>
  ) => {
    if (pathName !== 'group') {
      dispatch(operationFunction);
    } else if (pathName === 'group') {
      dispatch(groupOperationFunction);
    }
  };

  const handleOpenEditCustomCategoryField = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryName: string,
    associatedCategoryIndex: number,
    bigCategoriesIndex: number,
    categoryType: string
  ) => {
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    event.stopPropagation();
    props.setEditCustomCategoryName(associatedCategoryName);
    props.setAssociatedIndex(associatedCategoryIndex);
    props.setBigEditCategoryIndex(bigCategoriesIndex);
  };

  const handleAddCustomCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    props.setCustomCategoryName('');
    categoryOperationSwitching(
      addCustomCategories(props.customCategoryName, bigCategoryId, signal),
      addGroupCustomCategories(props.customCategoryName, bigCategoryId, Number(group_id), signal)
    );
  };

  const handleEditCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number,
    categoryType: string
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();
    document.removeEventListener(
      'click',
      categoryType === 'bigCategory' ? handleCloseBigCategoryMenu : handleCloseMediumCategoryMenu
    );
    props.setEditCustomCategoryName('');
    props.setAssociatedIndex(null);
    props.setBigEditCategoryIndex(null);

    categoryOperationSwitching(
      editCustomCategories(
        associatedCategoryId,
        props.editCustomCategoryName,
        bigCategoryId,
        signal
      ),
      editGroupCustomCategories(
        associatedCategoryId,
        props.editCustomCategoryName,
        bigCategoryId,
        Number(group_id),
        signal
      )
    );
  };

  const handleDeleteCustomCategory = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    associatedCategoryId: number,
    bigCategoryId: number
  ) => {
    const signal = axios.CancelToken.source();
    event.stopPropagation();

    if (window.confirm('カスタムカテゴリーを削除しますか？')) {
      categoryOperationSwitching(
        deleteCustomCategories(associatedCategoryId, bigCategoryId, signal),
        deleteGroupCustomCategories(associatedCategoryId, bigCategoryId, Number(group_id), signal)
      );
    }
  };

  return (
    <MediumCategoryList
      ref={props.mediumCategoryMenuRef}
      transactionType={props.transactionType}
      disabled={props.unEditInputForm}
      associatedCategory={props.associatedCategory}
      bigCategory={props.bigCategory}
      bigCategoryId={props.bigCategoryId}
      bigCategoryIndex={props.bigCategoryIndex}
      bigEditCategoryIndex={props.bigEditCategoryIndex}
      associatedIndex={props.associatedIndex}
      customCategoryName={props.customCategoryName}
      editCustomCategoryName={props.editCustomCategoryName}
      incomeCategories={pathName !== 'group' ? incomeCategories : groupIncomeCategories}
      expenseCategories={pathName !== 'group' ? expenseCategories : groupExpenseCategories}
      handleChangeCategory={handleChangeCategory}
      mediumCategoryMenuOpen={props.mediumCategoryMenuOpen}
      setMediumCategoryMenuOpen={props.setMediumCategoryMenuOpen}
      handleAddCustomCategory={handleAddCustomCategory}
      handleEditCustomCategory={handleEditCustomCategory}
      handleDeleteCustomCategory={handleDeleteCustomCategory}
      onClickCloseMediumCategoryMenu={handleCloseMediumCategoryMenu}
      handleChangeAddCustomCategory={handleChangeAddCustomCategory}
      handleChangeEditCustomCategory={handleChangeEditCustomCategory}
      handleOpenEditCustomCategoryField={handleOpenEditCustomCategoryField}
    />
  );
};
export default MediumCategoryListContainer;
