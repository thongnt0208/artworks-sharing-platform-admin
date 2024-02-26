import { Tag } from 'primereact/tag';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Column } from 'primereact/column';
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

import { _userList, USER_STATUS_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext();

  const menuRef = useRef(null);

  const [currentTab, setCurrentTab] = useState('all');

  const [tableData, setTableData] = useState(_userList);

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

  const tabHeaderTemplate = (options, tab) => (
    <div
      className="flex align-items-center gap-2 p-3"
      style={{ cursor: 'pointer' }}
      onClick={() => { options.onClick(); setCurrentTab(tab.value); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          options.onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
      <span className="font-bold white-space-nowrap">{tab.label}</span>
      <Badge value="2" />
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

  useEffect(()=> {
    setTableData(_userList);
  }, [])

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Button
          component={RouterLink}
          href={paths.dashboard.user.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New User
        </Button>

        <Card>
          <TabView>
            {STATUS_OPTIONS.map((tab, index) => (
              <TabPanel headerTemplate={(options) => tabHeaderTemplate(options, tab)} key={index} headerClassName="flex align-items-center">
                <><div>Tab {tab.label}</div>
                  <DataTable value={tableData} header={() => renderHeader()} >
                    <Column field="fullname" header="Full Name" sortable style={{ minWidth: '14rem' }} />
                    <Column field="username" header="Username" sortable style={{ minWidth: '14rem' }} />
                    <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                    <Column field="role" header="Role" sortable style={{ minWidth: '14rem' }} body={roleBodyTemplate} />
                    <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                  </DataTable>

                </>
              </TabPanel>
            ))}
          </TabView>
        </Card>
      </Container>
      <div>End {currentTab}</div>
    </>
  );
}
