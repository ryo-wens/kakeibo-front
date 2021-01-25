import React from 'react';
import { GroupYearlyAccountList } from '../../reducks/groupTransactions/types';
import qs from 'qs';
import { Header } from '../../components/header';
import { SelectYears } from '../../components/uikit';
import PayOffContainer from '../../containers/templates/account/PayOffContainer';
import '../../components/account/yearly-account.scss';

interface YearlyAccountProps {
  monthIndex: number;
  singleDigitMonth: number;
  searchLocation: string;
  queryParams: qs.ParsedQs;
  queryParamsLength: number;
  yearlyAccount: GroupYearlyAccountList;
  currentItem: boolean;
  setCurrentItem: React.Dispatch<React.SetStateAction<boolean>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  defaultStyle: (status: string) => { color: string; borderBottom: string };
  routingPayOff: (nextQueryPageQuery: { month: string }) => void;
}

const YearlyAccount = (props: YearlyAccountProps) => {
  return (
    <>
      <Header />
      <main className="section__container">
        {!props.currentItem && props.searchLocation.length === props.queryParamsLength ? (
          <>
            <div className="yearly-account__spacer yearly-account__spacer--large" />
            <div className="yearly-account__year-position">
              <SelectYears
                selectedYear={props.selectedYear}
                setSelectedYear={props.setSelectedYear}
              />
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
                  {props.yearlyAccount.yearly_accounting_status.map((accountStatus, index) => {
                    const selectedMonth =
                      Number(accountStatus.month.split('月')[props.monthIndex]) <=
                      props.singleDigitMonth
                        ? '0' + accountStatus.month.split('月')[props.monthIndex]
                        : accountStatus.month.split('月')[props.monthIndex];

                    return (
                      <tr className="yearly-account__tr" key={index}>
                        <td className="yearly-account__td">{accountStatus.month}</td>
                        <td className="yearly-account__td">
                          <a
                            aria-disabled={accountStatus.calculation_status === '-'}
                            style={props.defaultStyle(accountStatus.calculation_status)}
                            className="yearly-account__payoff-link"
                            onClick={() => {
                              const nextQueryPageQuery = {
                                ...props.queryParams,
                                month: selectedMonth,
                              };

                              props.routingPayOff(nextQueryPageQuery);
                              accountStatus.calculation_status !== '-' &&
                                props.setCurrentItem(true);
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
          <PayOffContainer
            setCurrentItem={props.setCurrentItem}
            selectedYear={props.selectedYear}
          />
        )}
      </main>
    </>
  );
};
export default YearlyAccount;
