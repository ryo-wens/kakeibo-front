import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import format from 'date-fns/format';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'yyyy MMM', { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, 'MMMd日', { locale: this.locale });
  }
}

const useStyles = makeStyles({
  root: {
    margin: '0px 8px 16px',
  },
});

type DatePickerProps = {
  id: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  required: boolean;
};

const DatePicker = (props: DatePickerProps) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          className={classes.root}
          id={props.id}
          label={props.label}
          format="yyyy/MM/dd"
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          okLabel="決定"
          cancelLabel="キャンセル"
          invalidDateMessage="日付の形式が正しくありません。"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default DatePicker;
