import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CreateGroups } from '../todo';
import { Divider } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { Groups } from '../../reducks/groups/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { fetchGroups } from '../../reducks/groups/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
      color: '#eee',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    group: {
      display: 'inline-block',
      width: '100%',
      padding: '10px 0px 10px 0px',
      textAlign: 'center',
      color: '#666',
      fontSize: '12px',
    },
  })
);

interface SwitchEntityProps {
  entity: string;
  switchEntity: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SwitchEntity = (props: SwitchEntityProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups: Groups = getApprovedGroups(selector);

  const openMenu = () => {
    if (!approvedGroups.length) {
      dispatch(fetchGroups());
    }
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          className={classes.select}
          value={props.entity}
          onOpen={() => openMenu()}
          onChange={props.switchEntity}
        >
          <MenuItem value={'UserName'} onClick={() => dispatch(push('/'))}>
            UserName
          </MenuItem>
          <Divider />
          <span className={classes.group}>グループ</span>
          {approvedGroups.map((approvedGroup) => {
            const selectedGroupId: number = approvedGroup.group_id;
            return (
              <MenuItem
                button={true}
                key={approvedGroup.group_id}
                value={approvedGroup.group_name}
                onClick={() => dispatch(push(`/group/${selectedGroupId}`))}
              >
                {approvedGroup.group_name}
              </MenuItem>
            );
          })}

          <CreateGroups modalTitleLabel={'グループ作成'} modalTextFieldLabel={'グループ名'} />
        </Select>
      </FormControl>
    </div>
  );
};

export default SwitchEntity;
