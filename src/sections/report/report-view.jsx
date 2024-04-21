import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/system';
import { Tab, Chip } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';

import { getAuthInfo } from 'src/utils/AuthUtil';
import { fDateTime } from 'src/utils/format-time';

import './report-view.scss';
import AccountRowExpand from './account-row-expand-section/account-row-expand';
import CommentRowExpand from './comment-row-expand-section/comment-row-expand';
import ArtworkRowExpand from './artwork-row-expand-section/artwork-row-expand';
import { getReportData, softDeleteAccount, softDeleteArtwork, updateReportState } from './Service';

export default function ReportView() {
  const authData = getAuthInfo();
  if (!authData) {
    window.location.href = '/login';
  }
  const networkTimeout = useRef(null);
  const toast = useRef(null);
  const [tabValue, setTabValue] = React.useState('0');
  const [expandedRows, setExpandedRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [reports, setReports] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showSuccess = (summary, detail) => {
    toast.current.show({ severity: 'success', summary, detail, life: 3000 });
  };

  const showError = (summary, detail) => {
    toast.current.show({ severity: 'error', summary, detail, life: 3000 });
  };

  const handleDeleteAccount = (accountId, reportId, state, note) => {
    try {
      const responseDeleteAcc = softDeleteAccount(accountId);
      if (responseDeleteAcc) {
        const response = updateReportState(reportId, state, note);
        if (response) {
          setRefresh(true);
          showSuccess('Thành công', 'Đã xóa tài khoản và cập nhật trạng thái báo cáo.');
        } else {
          showError('Lỗi', 'Không thể cập nhật trạng thái báo cáo.');
        }
      } else {
        showError('Lỗi', 'Không thể xóa tài khoản.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDeleteComment = (commentId, reportId, state, note) => {
  //   try {
  //     const responseDeleteCom = softDeleteComment(commentId);
  //     if (responseDeleteCom) {
  //       const response = updateReportState(reportId, state, note);
  //       if (response) {
  //         setRefresh(true);
  //         showSuccess('Thành công', 'Đã xóa bình luận và cập nhật trạng thái báo cáo.');
  //       } else {
  //         showError('Lỗi', 'Không thể cập nhật trạng thái báo cáo.');
  //       }
  //     } else {
  //       showError('Lỗi', 'Không thể xóa bình luận.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDeleteArtwork = (artworkId, reportId, state, note) => {
    try { 
      const responseDeleteArt = softDeleteArtwork(artworkId);
      if (responseDeleteArt) {
        const response = updateReportState(reportId, state, note);
        if (response) {
          setRefresh(true);
          showSuccess('Thành công', 'Đã xóa tác phẩm và cập nhật trạng thái báo cáo.');
        } else {
          showError('Lỗi', 'Không thể cập nhật trạng thái báo cáo.');
        }
      } else {
        showError('Lỗi', 'Không thể xóa tác phẩm.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectReport = (reportId, state, note) => {
    try {
      const response = updateReportState(reportId, state, note);
      if (response) {
        setRefresh(true);
        showSuccess('Thành công', 'Đã cập nhật trạng thái báo cáo.');
      } else {
        showError('Lỗi', 'Không thể cập nhật trạng thái báo cáo.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadLazyData = () => {
      setLoading(true);

      if (networkTimeout.current) {
        clearTimeout(networkTimeout.current);
      }

      // imitate delay of a backend call
      networkTimeout.current = setTimeout(
        () => {
          getReportData(tabValue, 1, 50, { lazyEvent: JSON.stringify(lazyState) }).then((data) => {
            if (data?.response?.status === 401) {
              window.location.href = '/login';
            }
            setTotalRecords(data.items.length);
            setReports(data.items);
            setLoading(false);
          });
        },
        Math.random() * 1000 + 250
      );
    };
    loadLazyData();
    setRefresh(false);
  }, [lazyState, tabValue, refresh]);

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const onSelectionChange = (event) => {
    const { value } = event;
    setSelectedCustomers(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event) => {
    if (event.checked) {
      getReportData.then((data) => {
        setSelectAll(true);
        setSelectedCustomers(data.items);
      });
    } else {
      setSelectAll(false);
      setSelectedCustomers([]);
    }
  };

  const createdTimeBodyTemplate = (rowData) => <span>{fDateTime(rowData.createdOn)}</span>;

  const rowExpansionTemplate = (data) => (
    <>
      {(tabValue === '0' && (
        <AccountRowExpand
          data={data}
          handleDeleteAccount={handleDeleteAccount}
          handleRejectReport={handleRejectReport}
        />
      )) ||
        (tabValue === '1' && (
          <CommentRowExpand
            data={data}
            // handleDeleteComment={handleDeleteComment}
            handleRejectReport={handleRejectReport}
          />
        )) ||
        (tabValue === '2' && (
          <ArtworkRowExpand
            data={data}
            handleDeleteArtwork={handleDeleteArtwork}
            handleRejectReport={handleRejectReport}
          />
        ))}
    </>
  );

  const stateBodyTemplate = (rowData) => {
    let stateBadge = null;
    switch (rowData.state) {
      case 'Waiting':
        stateBadge = <Chip label="Chờ xử lý" color="info" />;
        break;
      case 'Declined':
        stateBadge = <Chip label="Từ chối" color="error" style={{ width: '81.67px' }} />;
        break;
      case 'Accepted':
        stateBadge = <Chip label="Đã xử lý" color="success" style={{ width: '81.67px' }} />;
        break;
      default:
        break;
    }
    return stateBadge;
  };

  return (
    <div className="container max-h-full">
      <Toast ref={toast} />
      <h2 className="text-left m-0 mb-2 p-0">Danh sách báo cáo</h2>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Tài khoản" value="0" />
            {/* <Tab label="Bình luận" value="1" /> */}
            <Tab label="Tác phẩm" value="2" />
          </TabList>
        </Box>
      </TabContext>
      <DataTable
        className="report-table"
        value={reports}
        lazy
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        loading={loading}
        tableStyle={{ minWidth: '75rem' }}
        selection={selectedCustomers}
        onSelectionChange={onSelectionChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander style={{ width: '5rem' }} />
        <Column field="reportType" header="Loại báo cáo" sortable />
        {(tabValue === '0' && <Column field="target.fullname" header="Tên tài khoản" sortable />) ||
          (tabValue === '1' && (
            <Column field="target.content" header="Nội dung bình luận" sortable />
          )) ||
          (tabValue === '2' && <Column field="target.title" header="Tiêu đề" sortable />)}
        <Column field="reason" header="Lí do" sortable />
        <Column field="accountReport.fullname" header="Người báo cáo" sortable />
        <Column field="state" body={stateBodyTemplate} header="Trạng thái" sortable />
        <Column field="createdOn" header="Ngày báo cáo" body={createdTimeBodyTemplate} sortable />
        <Column field="note" header="Ghi chú" />
      </DataTable>
    </div>
  );
}
