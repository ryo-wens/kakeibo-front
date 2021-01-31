import React from 'react';
import { CreateGroups } from '../index';
import GroupMenuButtonContainer from '../../../../containers/header/group/GrouopMenuButtonContainer';
import { Menu } from '@material-ui/core';
import { Groups } from '../../../../reducks/groups/types';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';
import './switch-entity.scss';

interface SwitchEntityProps {
  approvedGroups: Groups;
  entityType: string;
  anchorEl: HTMLElement | null;
  name: string;
  openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  switchToIndividual: (userName: string) => void;
  switchToGroup: (groupId: number, groupName: string) => void;
}

const SwitchEntity = (props: SwitchEntityProps) => {
  return (
    <div>
      <GroupIcon className="switch-entity__group-icon" />
      <button className="switch-entity__button" onClick={props.openMenu}>
        {props.name}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.closeMenu}
        style={{ top: '45px' }}
      >
        <span className="switch-entity__group">グループ</span>

        <div className="switch-entity__group-list-item">
          {props.approvedGroups.map((approvedGroup) => {
            return (
              <div key={approvedGroup.group_id} className="switch-entity__position">
                {props.name === approvedGroup.group_name ? (
                  <CheckIcon className="switch-entity__check-icon" fontSize="inherit" />
                ) : (
                  <CheckIcon className="switch-entity__transparency-icon" fontSize="inherit" />
                )}
                <li
                  className="switch-entity__list-item"
                  key={approvedGroup.group_id}
                  onClick={() =>
                    props.switchToGroup(approvedGroup.group_id, approvedGroup.group_name)
                  }
                >
                  {approvedGroup.group_name}
                </li>
                <GroupMenuButtonContainer
                  approvedGroup={approvedGroup}
                  closeMenu={props.closeMenu}
                />
              </div>
            );
          })}
          <div className="switch-entity__position">
            {props.name === 'グループ選択なし' ? (
              <CheckIcon className="switch-entity__check-icon" fontSize="inherit" />
            ) : (
              <CheckIcon className="switch-entity__transparency-icon" fontSize="inherit" />
            )}
            <li
              className="switch-entity__list-item switch-entity__list-item-personal"
              value={'UserName'}
              onClick={() => props.switchToIndividual('グループ選択なし')}
            >
              グループ選択なし
            </li>
          </div>
        </div>

        <CreateGroups
          modalTitleLabel={'グループ作成'}
          modalTextFieldLabel={'グループ名'}
          closeMenu={props.closeMenu}
        />
      </Menu>
    </div>
  );
};

export default SwitchEntity;
