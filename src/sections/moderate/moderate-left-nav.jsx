/* eslint-disable */
// ----------------------------------------------------------------------
import React from 'react';

import MessageItemTemplate from './moderate-message-item';
import { DataScroller } from 'primereact/datascroller';
import { Tab, Tabs } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { Box } from '@mui/system';

export default function ModerateLeftNav(props) {
  const { tabValue, setTabValue, itemsList, selectingId, setSelectingId, setAccountId } = props;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="max-h-full">
      <h2 className="text-left m-0 mb-2 p-0">Danh sách tác phẩm</h2>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Chưa duyệt" value="0" />
            <Tab label="Chấp nhận" value="1" />
            <Tab label="Từ chối" value="2" />
          </TabList>
        </Box>
      </TabContext>
      <DataScroller
        value={itemsList}
        emptyMessage="Không có tác phẩm nào cần duyệt"
        rows={8}
        buffer={0.4}
        inline
        lazy={true}
        scrollHeight="80vh"
        itemTemplate={(item) => (
          <MessageItemTemplate
            key={item.id}
            item={item}
            selectingId={selectingId}
            setSelectingId={setSelectingId}
            setAccountId={setAccountId}
          />
        )}
      />
    </div>
  );
}
