import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { push } from 'connected-react-router';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupYearlyAccountList } from '../reducks/groupTransactions/operations';
import { getGroupYearlyAccountList } from '../reducks/groupTransactions/selectors';
import { GroupYearlyAccountList } from '../reducks/groupTransactions/types';
import axios, { CancelTokenSource } from 'axios';
import { year } from '../lib/constant';
import { Header } from '../components/header';
import { SelectYears } from '../components/uikit';
import '../components/account/yearly-account.scss';

const YearlyAccount = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const signal: CancelTokenSource = axios.CancelToken.source();
  const yearlyAccountList = useSelector(getGroupYearlyAccountList);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [yearlyAccount, setYearlyAccount] = useState<GroupYearlyAccountList>({
    Year: '',
    yearly_accounting_status: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      dispatch(fetchGroupYearlyAccountList(Number(id), selectedYear, signal));
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [id, selectedYear]);

  useEffect(() => {
    dispatch(fetchGroupYearlyAccountList(Number(id), selectedYear, signal));
  }, [selectedYear]);

  useEffect(() => {
    setYearlyAccount(yearlyAccountList);
  }, [yearlyAccountList]);

  const defaultStyle = (status: string) => {
    let color;
    let underLine;

    const accountStatus = status === '-';

    if (accountStatus) {
      color = '#000';
      underLine = 'none';
    }

    return { color: color, borderBottom: underLine };
  };

  return (
    <>
      <Header />
      <main className="section__container">
        <div className="yearly-account__spacer yearly-account__spacer--large" />
        <div className="yearly-account__backGround">
          <div className="yearly-account__year-position">
            {<SelectYears selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
          </div>
          <div className="yearly-account__spacer--medium" />
          <table className="yearly-account__yearly-table">
            <tbody>
              <tr className="yearly-account__yearly-table--top">
                <th className="yearly-account__th">月</th>
                <th className="yearly-account__th">精算状況</th>
                <th className="yearly-account__th">支払状況</th>
                <th className="yearly-account__th">受取状況</th>
              </tr>
              {yearlyAccount.yearly_accounting_status.map((accountStatus, index) => {
                const selectedMonth =
                  Number(accountStatus.month.split('月')[0]) <= 9
                    ? '0' + accountStatus.month.split('月')[0]
                    : accountStatus.month.split('月')[0];
                return (
                  <tr className="yearly-account__tr" key={index}>
                    <td className="yearly-account__td">{accountStatus.month}</td>
                    <td className="yearly-account__td">
                      <a
                        aria-disabled={accountStatus.calculation_status === '-'}
                        style={defaultStyle(accountStatus.calculation_status)}
                        className="yearly-account__payoff-link"
                        onClick={() =>
                          accountStatus.calculation_status !== '-' &&
                          dispatch(push(`/group/${id}/accounting/${selectedYear}/${selectedMonth}`))
                        }
                      >
                        {accountStatus.calculation_status}
                      </a>
                    </td>
                    <td className="yearly-account__td">{accountStatus.payment_status}</td>
                    <td className="yearly-account__td">{accountStatus.receipt_status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};
export default YearlyAccount;
