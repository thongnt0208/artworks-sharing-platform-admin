import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { Dialog } from '@mui/material';

import './account-row-expand.scss';

export default function AccountRowExpand({ data, handleDeleteAccount, handleRejectReport }) {
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const [state, setState] = React.useState(1);
  const [note, setNote] = React.useState('');

  const footer = (
    <>
      <Button
        rounded
        className="top-button"
        label="Xóa tài khoản"
        onClick={() => {
          setState(1);
          setOpenNoteDialog(true);
        }}
      />
      <Button
        rounded
        className="bot-button"
        label="Từ chối báo cáo"
        onClick={() => {
          setState(2);
          setOpenNoteDialog(true);
        }}
      />
    </>
  );

  return (
    <>
      <Card footer={footer} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${data.target.fullname}`}
            src={data.target.avatar}
            className="avatar-image"
          />
        </div>
        <div className="information-container">
          <h1 className="m-1 mb-5">{data.target.fullname}</h1>
          <div className="id grid w-fit">
            <h3 className="m-0 col-6">ID tài khoản:</h3>
            <strong className="col-6">{data.target.id}</strong>
          </div>
          <div className="username grid">
            <h3 className="m-0 col-6">Tên tài khoản:</h3>
            <strong className="col-6">{data.target.username}</strong>
          </div>
          <div className="email grid">
            <h3 className="m-0 col-6">Email:</h3>
            <strong className="col-6">{data.target.email}</strong>
          </div>
        </div>
      </Card>
      <Dialog
        className="note-dialog"
        open={openNoteDialog}
        onClose={() => setOpenNoteDialog(false)}
      >
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
              if (state === 1) {
                handleDeleteAccount(data.target.id, data.id, state, note);
              } else if (state === 2) {
                handleRejectReport(data.id, state, note);
              }
              setOpenNoteDialog(false);
            }}
          />
        </div>
      </Dialog>
    </>
  );
}

AccountRowExpand.propTypes = {
  data: PropTypes.object.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
  handleRejectReport: PropTypes.func.isRequired,
};
