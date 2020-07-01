import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      borderColor: '#2da3f7',
      color: '#2da3f7',
      fontWeight: 700,
      fontSize: 16,
      width: 235,
      margin: theme.spacing(2),
      '&:hover': {
        backgroundColor: '#2da3f7',
        color: '#fff',
      },
    },
  })
);

type GenericButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
};

const GenericButton = (props: GenericButtonProps) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => props.onClick()}
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    </div>
  );
};
export default GenericButton;
