import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchGroupYearlyAccountList } from '../reducks/groupTransactions/operations';
import { getGroupYearlyAccountList } from '../reducks/groupTransactions/selectors';
import { GroupYearlyAccountList } from '../reducks/groupTransactions/types';
import axios, { CancelTokenSource } from 'axios';
import { Header } from '../components/header';
import { SelectYears } from '../components/uikit';
import PayOff from './PayOff';
import '../components/account/yearly-account.scss';
import qs from 'qs';

const YearlyAccount = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const monthIndex = 0;
  const singleDigitMonth = 9;
  const queryParamsLength = 10;
  const history = useHistory();
  const searchLocation = useLocation().search;
  const queryParams = qs.parse(searchLocation);
  const getQuery = new URLSearchParams(searchLocation);
  const queryYear = getQuery.get('year');
  const signal: CancelTokenSource = axios.CancelToken.source();
  const yearlyAccountList = useSelector(getGroupYearlyAccountList);
  const [selectedYear, setSelectedYear] = useState<number>(Number(queryYear));
  const [currentItem, setCurrentItem] = useState<boolean>(false);
  const [yearlyAccount, setYearlyAccount] = useState<GroupYearlyAccountList>({
    Year: '',
    yearly_accounting_status: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
      dispatch(fetchGroupYearlyAccountList(Number(id), Number(queryYear), signal));
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [id, selectedYear, queryParamsLength]);

  useEffect(() => {
    dispatch(fetchGroupYearlyAccountList(Number(id), Number(queryYear), signal));
  }, [selectedYear]);

  useEffect(() => {
    setYearlyAccount(yearlyAccountList);
  }, [yearlyAccountList]);

  const defaultStyle = (status: string) => {
    let color;
    let underLine;

    if (status === '-') {
      color = '#000';
      underLine = 'none';
    }

    return { color: color, borderBottom: underLine };
  };

  return (
    <>
      <Header />
      <main className="section__container">
        {!currentItem && searchLocation.length === queryParamsLength ? (
          <>
            <div className="yearly-account__spacer yearly-account__spacer--large" />
            <div className="yearly-account__year-position">
              <SelectYears selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>
            <div className="yearly-account__backGround">
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
                      Number(accountStatus.month.split('月')[monthIndex]) <= singleDigitMonth
                        ? '0' + accountStatus.month.split('月')[monthIndex]
                        : accountStatus.month.split('月')[monthIndex];

                    return (
                      <tr className="yearly-account__tr" key={index}>
                        <td className="yearly-account__td">{accountStatus.month}</td>
                        <td className="yearly-account__td">
                          <a
                            aria-disabled={accountStatus.calculation_status === '-'}
                            style={defaultStyle(accountStatus.calculation_status)}
                            className="yearly-account__payoff-link"
                            onClick={() => {
                              const nextQueryPageQuery = {
                                ...queryParams,
                                month: selectedMonth,
                              };

                              history.push({
                                search: decodeURIComponent(qs.stringify(nextQueryPageQuery)),
                              });
                              accountStatus.calculation_status !== '-' && setCurrentItem(true);
                            }}
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
          </>
        ) : (
          <PayOff setCurrentItem={setCurrentItem} selectedYear={selectedYear} />
        )}
      </main>
    </>
  );
};
export default YearlyAccount;
