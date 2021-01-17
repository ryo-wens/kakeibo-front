import React from 'react';
import '../../assets/todo/switch-today-or-monthly-button.scss';

interface SwitchTodayOrMonthlyButtonProps {
  currentTodayOrMonthly: 'today' | 'monthly';
  setCurrentTodayOrMonthly: React.Dispatch<React.SetStateAction<'today' | 'monthly'>>;
}

const SwitchTodayOrMonthlyButton = (props: SwitchTodayOrMonthlyButtonProps) => {
  const currentTemplateButtonStyle = (value: 'today' | 'monthly') => {
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
        onClick={() => props.setCurrentTodayOrMonthly('today')}
        style={currentTemplateButtonStyle('today')}
      >
        今日
      </button>
      <button
        onClick={() => props.setCurrentTodayOrMonthly('monthly')}
        style={currentTemplateButtonStyle('monthly')}
      >
        月間
      </button>
    </div>
  );
};

export default SwitchTodayOrMonthlyButton;
