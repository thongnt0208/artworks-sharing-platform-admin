/* eslint-disable react-hooks/exhaustive-deps */

import { Tag } from 'primereact/tag';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useRef, useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button as ButtonPr } from 'primereact/button';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// eslint-disable-next-line import/no-unresolved
import './user-list-view.scss';
import { getAccountsList, getDeletedAccountsList } from './user-list-service';

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(0);

  const [tableData, setTableData] = useState([]);
  const [showingData, setShowingData] = useState([]);
  const [deletedTableData, setDeletedTableData] = useState([]);

  const getSeverity = (status) => {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
      case 'Admin':
        return 'success';

      case 'new':
      case 'CommonUser':
        return 'info';

      case 'negotiation':
      case 'Moderator':
        return 'warning';

      default:
        return null;
    }
  };

  const actionItems = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => { }
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => { }
    }
  ];

  const tabHeaderTemplate = (options, tab, index) => (
    <div
      className={`flex align-items-center gap-2 p-3 ${currentTab === index ? 'active-tab' : 'inactive-tab'}`}
      style={{ cursor: 'pointer' }}
      onClick={() => options.onClick()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          options.onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className="font-bold white-space-nowrap">{tab.label}</span>

      <Badge value={
        (tab.value === "active" && tableData.length) ||
        (tab.value === "deleted" && deletedTableData.length)
      } />
    </div>
  );

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
      <h4 className="m-0">Accounts</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={() => { }} onChange={() => { }} placeholder="Keyword Search" />
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData) => <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  const roleBodyTemplate = (rowData) => <Tag value={rowData.role} severity={getSeverity(rowData.role)} />;
  const actionBodyTemplate = () => <>
    <Menu model={actionItems} popup ref={menuRef} id="popup_menu" />
    <ButtonPr icon="pi pi-cog" className="mr-2" onClick={(event) => menuRef.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
  </>;

  const getTableData = () => {
    getAccountsList()
      .then((accounts) => {
        console.log(accounts);
        setTableData(accounts);
        setShowingData(accounts);
      })
      .catch((error) => {
        console.error('Error fetching accounts list', error);
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log('Unauthorized');
          navigate('/login')
        }
      });

    getDeletedAccountsList()
      .then((accounts) => {
        console.log(accounts);
        setDeletedTableData(accounts);
      })
  }

  useEffect(() => {
    getTableData();
  }, [])

  useEffect(() => {
    if (currentTab === 1) { // Assuming "deleted" tab is at index 2
      setShowingData(deletedTableData);
    } else {
      getTableData();
    }

  }, [currentTab]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Card>
          <TabView activeIndex={currentTab} onTabChange={(e) => setCurrentTab(e.index)}>
            <TabPanel headerTemplate={(options) => tabHeaderTemplate(options, { label: 'Active', value: 'active' }, 0)} headerClassName="flex align-items-center">
              <DataTable value={showingData} header={() => renderHeader()} >
                <Column field="fullname" header="Full Name" sortable style={{ minWidth: '14rem' }} />
                <Column field="username" header="Username" sortable style={{ minWidth: '14rem' }} />
                <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                <Column field="role" header="Role" sortable style={{ minWidth: '14rem' }} body={roleBodyTemplate} />
                <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
              </DataTable>
            </TabPanel>
            <TabPanel headerTemplate={(options) => tabHeaderTemplate(options, { label: 'Deleted', value: 'deleted' }, 1)} headerClassName="flex align-items-center">
              <DataTable value={deletedTableData} header={() => renderHeader()} >
                <Column field="fullname" header="Full Name" sortable style={{ minWidth: '14rem' }} />
                <Column field="username" header="Username" sortable style={{ minWidth: '14rem' }} />
                <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                <Column field="role" header="Role" sortable style={{ minWidth: '14rem' }} body={roleBodyTemplate} />
                <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
              </DataTable>
            </TabPanel>
            <TabPanel header={<Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Tạo tài khoản
            </Button>}
              headerClassName="flex align-items-center" />
          </TabView>
        </Card>
      </Container>
      <div>End {currentTab}</div>
    </>
  );
}
