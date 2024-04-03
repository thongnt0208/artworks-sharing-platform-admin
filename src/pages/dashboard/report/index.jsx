import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';

import { getAuthInfo } from 'src/utils/AuthUtil';
import { fDateTime } from 'src/utils/format-time';

import { getReportData } from './Service';

export default function ReportPage() {
  const authData = getAuthInfo();
  if (!authData) {
    window.location.href = '/login';
  }

  const [tabValue, setTabValue] = React.useState('0');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [reports, setReports] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      name: { value: '', matchMode: 'contains' },
      'country.name': { value: '', matchMode: 'contains' },
      company: { value: '', matchMode: 'contains' },
      'representative.name': { value: '', matchMode: 'contains' },
    },
  });

  // let networkTimeout = null;

  const networkTimeout = useRef(null);

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
            console.log('Report data:', data);
            setTotalRecords(data.items.length);
            setReports(data.items);
            setLoading(false);
          });
        },
        Math.random() * 1000 + 250
      );
    };
    loadLazyData();
  }, [lazyState, tabValue]);

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  // const onFilter = (event) => {
  //   event.first = 0;
  //   setlazyState(event);
  // };

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

  return (
    <div className="max-h-full">
      <h2 className="text-left m-0 mb-2 p-0">Danh sách tác phẩm</h2>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Tài khoản" value="0" />
            <Tab label="Bình luận" value="1" />
            <Tab label="Tác phẩm" value="2" />
          </TabList>
        </Box>
      </TabContext>
      <DataTable
        value={reports}
        lazy
        // filterDisplay="row"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        // onFilter={onFilter}
        // filters={lazyState.filters}
        loading={loading}
        tableStyle={{ minWidth: '75rem' }}
        selection={selectedCustomers}
        onSelectionChange={onSelectionChange}
        selectAll={selectAll}
        onSelectAllChange={onSelectAllChange}
      >
        <Column field="reportType" header="Nội dung" sortable />

        {(tabValue === '0' && <Column field="target.fullname" header="Tên tài khoản" sortable />) ||
          (tabValue === '1' && (
            <Column field="target.content" header="Nội dung bình luận" sortable />
          )) ||
          (tabValue === '2' && <Column field="target.title" header="Tiêu đề" sortable />)}
        <Column field="reason" header="Lí do" sortable />

        <Column field="accountReport.fullname" header="Người báo cáo" sortable />
        <Column field="state" header="Trạng thái" sortable />
        <Column field="createdOn" header="Ngày báo cáo" body={createdTimeBodyTemplate} sortable />
        <Column field="note" header="Ghi chú" />
      </DataTable>
    </div>
  );
}
