import React from 'react';
import { Group } from '../../reducks/groups/types';
import './color-explanation.scss';

interface ColorExplanationProps {
  approvedGroup: Group;
}

const ColorExplanation = (props: ColorExplanationProps) => {
  const payerColorBox = (payerUserId: string): React.CSSProperties => {
    let color!: string;

    if (props.approvedGroup !== undefined) {
      for (const groupUser of props.approvedGroup.approved_users_list) {
        if (groupUser.user_id === payerUserId) {
          color = groupUser.color_code;
        }
      }
    }

    return { backgroundColor: color, boxSizing: 'border-box' };
  };

  return (
    <div>
      {props.approvedGroup !== undefined && (
        <>
          <span className="color-explanation__group-text">{props.approvedGroup.group_name}</span>
          メンバーカラー
          <div className="color-explanation__spacer--small" />
          <div className="color-explanation__icon-position">
            {props.approvedGroup.approved_users_list.map((group) => {
              return (
                <div key={group.user_id} className="color-explanation__payer-position">
                  <span
                    className="color-explanation__payer-color"
                    style={payerColorBox(group.user_id)}
                  />
                  <span>{group.user_name}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ColorExplanation;
