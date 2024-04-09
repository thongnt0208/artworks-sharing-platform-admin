import PropTypes from 'prop-types';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';

import { Dialog } from '@mui/material';

import './comment-row-expand.scss';
import { getCommentDetailData } from '../Service';

export default function CommentRowExpand({ data, handleDeleteComment, handleRejectReport }) {
  const [comment, setComment] = useState(null);
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const [state, setState] = React.useState(1);
  const [note, setNote] = React.useState('');

  useEffect(() => {
    const handleGetCommentDetail = () => {
      getCommentDetailData(data.targetId).then((response) => {
        if (response) {
          setComment(response);
        }
      });
    };
    handleGetCommentDetail();
  }, [data.targetId]);

  return (
    <div className="comment-row-expand-container">
      <div className="comment-section p-mb-2">
        <Image src={comment?.createdBy?.avatar} alt={comment?.createdBy?.fullname} />
        <div className="flex flex-column gap-1 justify-content-center">
          <span className="text-cus-normal-bold">{comment?.createdBy?.fullname}</span>
          <span className="content text-cus-normal">
            Nội dung bình luận: <strong>{comment?.content}</strong>
          </span>
        </div>
      </div>
      <div className="action-section">
        <Button
          rounded
          className="top-button"
          label="Xóa bình luận"
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
      </div>
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
          <div className="w-full flex flex-row justify-content-center">
            <Button
              className="dialog-btn"
              label="Xác nhận"
              onClick={() => {
                if (state === 1) {
                  handleDeleteComment(comment.id, data.id, state, note);
                } else if (state === 2) {
                  handleRejectReport(data.id, state, note);
                }
                setOpenNoteDialog(false);
              }}
            />
            <Button
              className="dialog-btn"
              label="Hủy"
              onClick={() => {
                setOpenNoteDialog(false);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

CommentRowExpand.propTypes = {
  data: PropTypes.object.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleRejectReport: PropTypes.func.isRequired,
};
