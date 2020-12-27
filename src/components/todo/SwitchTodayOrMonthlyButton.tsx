import React from 'react';
import '../../assets/todo/switch-today-or-monthly-button.scss';

interface SwitchTodayOrMonthlyButtonProps {
  currentTodayOrMonthly: number;
  setCurrentTodayOrMonthly: React.Dispatch<React.SetStateAction<number>>;
}

const SwitchTodayOrMonthlyButton = (props: SwitchTodayOrMonthlyButtonProps) => {
  const currentTemplateButtonStyle = (value: number) => {
    if (props.currentTodayOrMonthly === value) {
      return {
        color: '#fff',
        backgroundColor: '#5D6C89',
      };
    } else {
      return;
    }
  };

  return (
    <div className="switch-today-or-monthly-button">
      <button
        onClick={() => props.setCurrentTodayOrMonthly(0)}
        style={currentTemplateButtonStyle(0)}
      >
        今日
      </button>
      <button
        onClick={() => props.setCurrentTodayOrMonthly(1)}
        style={currentTemplateButtonStyle(1)}
      >
        月間予定
      </button>
    </div>
  );
};

export default SwitchTodayOrMonthlyButton;
