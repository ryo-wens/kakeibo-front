import React, { useEffect, useRef, useState } from 'react';
import { RelatedTransactionData } from '../../../../../../reducks/shoppingList/types';
import RelatedTransactionDataButton from '../../../../../../components/shoppingList/modules/listItem/shoppingListItemComponent/relatedTransactionDataButton/RelatedTransactionDataButton';

interface RelatedTransactionDataButtonContainerProps {
  transactionData: RelatedTransactionData;
  displayTermClassName: string;
  categoryDataClassName: string;
}

const RelatedTransactionDataButtonContainer = (
  props: RelatedTransactionDataButtonContainerProps
) => {
  const [open, setOpen] = useState(false);
  const transactionDataRef = useRef<HTMLDivElement>(null);

  const openTransactionData = () => {
    setOpen(true);
  };

  const onClickCloseTransactionData = (event: Event) => {
    if (transactionDataRef.current && !transactionDataRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('click', onClickCloseTransactionData, { capture: true });
      return () => {
        document.removeEventListener('click', onClickCloseTransactionData, { capture: true });
      };
    }
  }, [onClickCloseTransactionData]);

  const displayMediumCategoryOrCustomCategory = (transactionData: RelatedTransactionData) => {
    if (transactionData.medium_category_name !== null) {
      return transactionData.medium_category_name;
    }
    if (transactionData.custom_category_name !== null) {
      return transactionData.custom_category_name;
    }
    return '';
  };

  const displayRelatedTransactionData: string = displayMediumCategoryOrCustomCategory(
    props.transactionData
  );

  return (
    <RelatedTransactionDataButton
      open={open}
      transactionData={props.transactionData}
      associatedCategoryName={displayRelatedTransactionData}
      openTransactionData={openTransactionData}
      categoryDataClassName={props.categoryDataClassName}
      displayTermClassName={props.displayTermClassName}
      ref={transactionDataRef}
    />
  );
};

export default RelatedTransactionDataButtonContainer;
