import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styles from './ModalFormLayout.module.scss';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import cn from 'classnames';

interface ModalFormLayoutProps {
  titleLabel: string;
  handleClose: () => void;
  handleBack?: () => void;
}

const ModalFormLayout: React.FC<ModalFormLayoutProps> = (props) => {
  const { titleLabel, handleClose, handleBack, children } = props;

  const backButtonClassName = cn(styles.backBtn, { [styles.hideBackBtn]: !handleBack });

  return (
    <div className={styles.wrapper}>
      <div className={styles.position}>
        <button className={backButtonClassName} onClick={handleBack}>
          <ChevronLeftIcon />
        </button>
        <h3>{titleLabel}</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ModalFormLayout;
