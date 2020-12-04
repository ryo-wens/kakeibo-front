import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { weekDays, selectedDate } from '../../lib/date';
import AddTransactionModal from './AddTransactionModal';

interface SelectMenuProps {
  startDate: number;
  endDate: number;
  year: number;
  month: number;
}
const SelectMenu = (props: SelectMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalOpen = (index: number) => {
    setId(index);
    setAnchorEl(null);
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const selectedDays = (index: number): Date => {
    return selectedDate(props.startDate, props.endDate, props.year, props.month)[index];
  };

  return (
    <div>
      <button
        className="btn--primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        入力する
      </button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {weekDays(props.startDate, props.endDate, props.month).map((weekDay, index) => {
          return (
            <MenuItem key={index} onClick={() => modalOpen(index)}>
              {weekDay}
            </MenuItem>
          );
        })}
      </Menu>
      <AddTransactionModal selectDate={selectedDays(id)} open={open} onClose={modalClose} />
    </div>
  );
};

export default SelectMenu;
