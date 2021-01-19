import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderColor: '#3086f0',
      color: '#3086f0',
      fontWeight: 700,
      fontSize: 16,
      width: '100%',
      '&:hover': {
        backgroundColor: '#3086f0',
        color: '#fff',
      },
    },
  })
);

type GenericButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  startIcon?: React.ReactNode;
};

const GenericButton = (props: GenericButtonProps) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={props.startIcon}
        onClick={() => props.onClick()}
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    </div>
  );
};
export default GenericButton;
