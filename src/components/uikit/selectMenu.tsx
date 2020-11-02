import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { weekDays } from '../../lib/date';

interface SelectMenuProps {
  startDate: number;
  endDate: number;
}
const SelectMenu = (props: SelectMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        {weekDays(props.startDate, props.endDate).map((weekDay, index) => {
          return (
            <MenuItem key={index} onClick={handleClose}>
              {weekDay}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default SelectMenu;
