import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import format from 'date-fns/format';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
    width: '100%',
  },
});

type DatePickerProps = {
  id: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  required: boolean;
  disabled: boolean;
  minDate: Date | null;
  onOpen?: () => void;
  onClose?: () => void;
};

const DatePicker = (props: DatePickerProps) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <Grid className={classes.root}>
        <KeyboardDatePicker
          className={classes.root}
          id={props.id}
          disabled={props.disabled}
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
          minDate={props.minDate}
          onOpen={props.onOpen}
          onClose={props.onClose}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default DatePicker;
