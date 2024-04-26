import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';

import { Dialog } from '@mui/material';

import './artwork-row-expand.scss';
import { getArtworkDetailData } from '../Service';

export default function ArtworkRowExpand({ data, handleDeleteArtwork, handleRejectReport }) {
  const [artwork, setArtwork] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const [state, setState] = React.useState(1);
  const [note, setNote] = React.useState('');

  const toggleShowImages = () => {
    setShowAllImages(!showAllImages);
  };

  useEffect(() => {
    getArtworkDetailData(data.targetId)
      .then((response) => {
        setArtwork(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  return (
    <div className="artwork-row-expand-container">
      <div className="artwork-detail">
        <div className="title-container">
          <h1 className="text-cus-h1-bold">{artwork?.title}</h1>
        </div>
        <div
          className="artwork-images-container"
          style={{
            maxHeight: showAllImages ? 'none' : '800px',
            overflow: 'hidden',
          }}
        >
          {/* Display images */}
          {artwork?.images?.map((image, index) => (
            <Image key={index} src={image?.location} alt={`Image ${index + 1}`} width="100%" />
          ))}
        </div>
        <div className="artwork-info-container">
          {/* Show more button */}
          <div className="showmore-btn-container">
            <Button onClick={toggleShowImages} className="show-more-button">
              {showAllImages ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </div>
          {/* Description */}
          <p>{artwork?.description}</p>
          {/* Tags */}
          <div className="flex gap-3">
            {artwork?.tagDetails?.map((tag) => (
              <Button key={tag?.id}>
                <Link to="" className="tag-inline">
                  #{tag?.tagName}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {(data.state !== "Accepted" && data.state !== "Declined") && (
          <div className="action-section">
            <Button
              rounded
              className="top-button"
              label="Xóa tác phẩm"
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
        )}
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
              className="dialog-btn mr-2"
              label="Xác nhận"
              onClick={() => {
                if (state === 1) {
                  handleDeleteArtwork(data.target.id, data.id, state, note);
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

ArtworkRowExpand.propTypes = {
  data: PropTypes.object.isRequired,
  handleDeleteArtwork: PropTypes.func.isRequired,
  handleRejectReport: PropTypes.func.isRequired,
};
