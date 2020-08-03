import React from 'react';

function TodayDate() {
  const today: Date = new Date();
  // console.log(today);
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  return (
    <div>
      <span>
        今日 {month}/{date} ({day})
      </span>
    </div>
  );
}

export default TodayDate;
