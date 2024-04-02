import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

import { Radio, Dialog, TextField, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

import AssetsCard from 'src/components/card/asset-card';

import './style/moderate-right-nav.scss';

const Accept = 1;
const Report = 2;

export default function ModerateRightNav({
  thumbnail,
  artwork,
  account,
  handleModerateCallback,
  handleDownloadAssetsCallback,
}) {
  const { avatar, fullname, email } = account;
  const { assets } = artwork;
  const [note, setNote] = React.useState('');
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const [openReportDialog, setOpenReportDialog] = React.useState(false);
  const [openDownloadDialog, setOpenDownloadDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('Spam');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
            <Button
              className="download-btn"
              rounded
              label="Tải tất cả tài nguyên"
              onClick={() => setOpenDownloadDialog(true)}
            />
          </div>
          <div className="btn-container">
            <Button
              rounded
              label="Chấp nhận bài "
              onClick={() => {
                setOpenNoteDialog(true);
              }}
            />
            <Button
              rounded
              label="Báo cáo vi phạm "
              onClick={() => {
                setOpenReportDialog(true);
              }}
            />
          </div>
        </>
      ) : (
        <div>Chưa có tác phẩm nào cần duyệt!</div>
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
          <Button
            className="dialog-btn"
            label="Chấp nhận"
            onClick={() => {
              handleModerateCallback(Accept, note);
              setOpenNoteDialog(false);
            }}
          />
        </div>
      </Dialog>
      <Dialog
        className="report-dialog"
        open={openReportDialog}
        onClose={() => setOpenReportDialog(false)}
      >
        <div className="dialog-container">
          <h2 className="dialog-title">Báo cáo vi phạm</h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Nội dung rác" control={<Radio />} label="Nội dung rác" />
              <FormControlLabel
                value="Nội dung người lớn"
                control={<Radio />}
                label="Nội dung người lớn"
              />
              <FormControlLabel
                value="Nội dung lừa đảo"
                control={<Radio />}
                label="Nội dung lừa đảo"
              />
              <FormControlLabel
                value="Nội dung gây hại hoặc bất hợp pháp"
                control={<Radio />}
                label="Nội dung gây hại hoặc bất hợp pháp"
              />
              <FormControlLabel
                value="Vi phạm quyền lợi của tôi"
                control={<Radio />}
                label="Vi phạm quyền lợi của tôi"
              />
              <FormControlLabel
                value="Nội dung thiếu sót hoặc không phù hợp"
                control={<Radio />}
                label="Nội dung thiếu sót hoặc không phù hợp"
              />
              <FormControlLabel value="Lý do khác" control={<Radio />} label="Lý do khác" />
            </RadioGroup>
          </FormControl>
          {selectedValue === 'Lý do khác' && (
            <TextField
              id="other-reason"
              label="Lý do khác"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
          )}
          <Button
            className="dialog-btn"
            label="Báo cáo"
            onClick={() => {
              handleModerateCallback(Report, selectedValue);
              setOpenReportDialog(false);
            }}
          />
        </div>
      </Dialog>
      <Dialog
        className="download-resourses-dialog"
        open={openDownloadDialog}
        onClose={() => setOpenDownloadDialog(false)}
      >
        <div className="dialog-container">
          <AssetsCard
            thumbnail={thumbnail}
            itemsList={assets}
            handleDownloadAssetsCallback={handleDownloadAssetsCallback}
          />
        </div>
      </Dialog>
    </div>
  );
}

ModerateRightNav.propTypes = {
  thumbnail: PropTypes.string,
  artwork: PropTypes.object,
  account: PropTypes.object.isRequired,
  handleModerateCallback: PropTypes.func.isRequired,
  handleDownloadAssetsCallback: PropTypes.func.isRequired,
};
