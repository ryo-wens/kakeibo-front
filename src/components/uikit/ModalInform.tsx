import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getModalOpen } from '../../reducks/modal/selectors';
import { closeModalAction } from '../../reducks/modal/actions';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#555',
      borderRadius: 20,
      color: '#fff',
      padding: '0px 20px',
    },
  })
);

interface ModalInformProps {
  message: string;
}

const ModalInform = (props: ModalInformProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const modalOpen = getModalOpen(selector);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={() => dispatch(closeModalAction())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          invisible: true,
        }}
        disableBackdropClick={false}
      >
        <Fade in={modalOpen} timeout={1500}>
          <div className={classes.paper}>
            <p>{props.message}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalInform;
