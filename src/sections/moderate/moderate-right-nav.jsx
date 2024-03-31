import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

import { Dialog } from '@mui/material';

import './style/moderate-right-nav.scss';

export default function ModerateRightNav({ account, handleModerateCallback }) {
  const { avatar, fullname, email } = account;
  const [note, setNote] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="container">
      {avatar || fullname || email ? (
        <>
          <div className="account-info-container">
            <img className="avatar-image" src={avatar} alt={fullname} />
            <h2 className="fullname">{fullname}</h2>
            <p className="email">{email}</p>
          </div>
          <div className="download-container">
            <Button className="download-btn" rounded label="Tải tất cả tài nguyên" />
          </div>
          <div className="btn-container">
            <Button
              rounded
              label="Chấp nhận bài "
              onClick={() => {
                setOpenDialog(true);
              }}
            />
            <Button rounded label="Báo cáo vi phạm " />
          </div>
        </>
      ) : (
        <div>Chưa có tác phẩm nào cần duyệt!</div>
      )}
      <Dialog className="note-dialog" open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="dialog-container">
          <h2 className="dialog-title">Ghi chú</h2>
          <textarea
            rows={10}
            cols={50}
            className="dialog-textarea"
            placeholder="Nhập ghi chú"
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <Button
            className="dialog-btn"
            label="Chấp nhận"
            onClick={() => {
              handleModerateCallback(note);
              setOpenDialog(false);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

ModerateRightNav.propTypes = {
  account: PropTypes.object.isRequired,
  handleModerateCallback: PropTypes.func.isRequired,
};
