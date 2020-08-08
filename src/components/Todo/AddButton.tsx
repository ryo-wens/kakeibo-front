import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface AddButtonProps {
  label: string;
  // onClick: () => void;
}

const AddButton = (props: AddButtonProps) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color="default" className={classes.button} startIcon={<AddIcon />}>
      {props.label}
    </Button>
  );
};

export default AddButton;
