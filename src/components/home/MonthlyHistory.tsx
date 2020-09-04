import React, { ReactElement, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius:0,
      borderSpacing:0
    },
    title: {
      paddingLeft:10
    },
    tableTop: {
      backgroundColor: '#4db5fa'
    },
    tableCell: {
      border:'solid 1px #e1e3e3',
    },
    tableMain: {
      minHeight:300
    },
    text: {
      fontSize:16,
      fontWeight:700
    },
    totalDisplay: {
      textAlign:'right',
      fontSize:16,
      fontWeight:700
    },
    iconPosition: {
      textAlign:'center'
    }
  })
)


const MonthlyHistory = () => {
  const classes = useStyles()

  type Day = { date: string }
  type Week = Array<Day>
  type Weeks = Array<Week>

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const startDate = new Date(year, month - 1, 1)  // 月の最初の日を取得
  const endDate = new Date(year, month, 0)  // 月の最後の日を取得
  const endDayCount = endDate.getDate()
  let currentDayOfWeek = startDate.getDay() // 月の最初の日の曜日を取得

  let week: Week = []
  let displayWeeks: Weeks = []

  for (let i = 1; i <= endDayCount; i++) {
    week.push({
      date:  (i) + "日",
    })
    if (currentDayOfWeek === 6) {
      displayWeeks.push(week)
      week = []
      currentDayOfWeek = 0
    } else if (i === endDayCount) {
      displayWeeks.push(week)
    } else {
      currentDayOfWeek++
    }
  }


  const dateDisplay = useMemo(() => {
    let prevDateDisplay:ReactElement<Weeks>[] = []
    let weekNum = 1
    displayWeeks.map((displayWeek,date) => {
      prevDateDisplay = [
        ...prevDateDisplay,
        <Table key={date} className='box__monthlyExpense__item' aria-label="simple table">
            <TableHead  className = {classes.tableTop}>
              <TableRow key={date}>
              <TableCell key={date} className={classes.tableCell}  align="center">
                {weekNum++}週目
                <br/>
                {month + '月'+　displayWeek[0].date}~{displayWeek[displayWeek.length-1].date}
              </TableCell>
              </TableRow>
            </TableHead>
            {/*<TableBody className = {classes.tableMain} />*/}
          <TableRow className={classes.tableCell} >
            <TableCell align={'center'}>
              <IconButton
                color="primary"
                size={"small"}
                onClick={() =>alert('テスト')}
              >
                <CreateIcon className={classes.iconPosition} />
              </IconButton>
            </TableCell>
          </TableRow>
            <TableRow className={classes.tableCell}>
              <TableCell className={classes.text}>小計</TableCell>
            </TableRow>
        </Table>
      ]
    })
    return prevDateDisplay
  },[displayWeeks])

  return(
    <div className="box__monthlyExpense">
      <h2 className={ classes.title}>{month}月の支出</h2>
      <TableContainer className = 'box__monthlyExpense__container'  component={Paper}>
        {dateDisplay}
      </TableContainer>
      <div className={classes.totalDisplay }>合計：</div>
    </div>
  )
}

export default MonthlyHistory

