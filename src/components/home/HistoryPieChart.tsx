import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';

const HistoryPieChart = () => {
  const data = [
    {
      id: 0,
      name: '食費',
      value: 3000,
    },
    {
      id: 1,
      name: '日用品',
      value: 2000,
    },
    {
      id: 2,
      name: '交通費',
      value: 3800,
    },
    {
      id: 3,
      name: '衣類',
      value: 8000,
    },
    {
      id: 4,
      name: '趣味',
      value: 4000,
    },
  ];

  const colors = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042', '#FFBEDA'];

  return (
    <PieChart className="pie__chart" width={200} height={200}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={100}
        nameKey={'name'}
        dataKey={'value'}
        cx="50%"
        cy="50%"
      >
        {data.map((item) => (
          <Cell key={item.id} fill={colors[item.id % colors.length]} />
        ))}
        <Label width={30} position={'center'}>
          今月の支出総額
        </Label>
      </Pie>
      <Tooltip />
    </PieChart>
  );
};
export default HistoryPieChart;
