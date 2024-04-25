/* eslint-disable react-hooks/exhaustive-deps */

import { Tag } from 'primereact/tag';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useRef, useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button as ButtonPr } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { fDateTime } from 'src/utils/format-time';

import { getSeverity } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

// eslint-disable-next-line import/no-unresolved
import './user-list-view.scss';
import { deleteAccount, restoreAccount, getAccountsList, getDeletedAccountsList } from './user-list-service';

// ----------------------------------------------------------------------

export default function UserListView() {
  const toast = useRef(null);
  const settings = useSettingsContext();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(0);

  const [showingData, setShowingData] = useState([]);
  const [activeTableData, setActiveTableData] = useState([]);
  const [deletedTableData, setDeletedTableData] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

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
        (tab.value === "active" && activeTableData.length) ||
        (tab.value === "deleted" && deletedTableData.length)
      } />
    </div>
  );

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
      <h3 className="m-0">Các tài khoản có trên hệ thống</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={() => { }} onChange={() => { }} placeholder="Tìm kiếm" />
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData) => <Tag value={rowData.deletedOn ? "Đã xóa" : "Hoạt động"} severity={rowData.deletedOn ? "" : "success"} />;
  const roleBodyTemplate = (rowData) => <Tag value={rowData.role} severity={getSeverity(rowData.role)} />;
  const actionBodyTemplate = (rowData) => <>
    <Menu model={actionItems} popup ref={menuRef} id="popup_menu" />
    <ButtonPr disabled={loading} loading={loading} icon="pi pi-cog" className="mr-2" onClick={(event) => { menuRef.current.toggle(event); setSelectedAccountId(rowData.id); }} aria-controls="popup_menu" aria-haspopup />
  </>;

  const handleUnauthError = (error) => {
    console.log(error.response.status);
    setLoading(false);
    toast.current.show({ severity: 'error', summary: 'Chưa xoá', detail: 'Đã xảy ra lỗi, vui lòng thử lại.', life: 3000 });
    if (error.response.status === 401) {
      toast.current.show({ severity: 'error', summary: 'Phiên đăng nhập hết hạn', detail: 'Bạn đang được chuyển sang trang đăng nhập ...', life: 3000 });
      setTimeout(() => {
        navigate('/login')
      }, 2500);
    }
  }

  const refreshTableData = () => {
    setLoading(true);
    getAccountsList()
      .then((accounts) => {
        setLoading(false);
        console.log(accounts);
        setShowingData(accounts?.items);
        setActiveTableData(accounts?.items);
      })
      .catch((error) => handleUnauthError(error));

    getDeletedAccountsList()
      .then((accounts) => {
        setDeletedTableData(accounts);
      })
  }

  const actionItems = [
    {
      label: currentTab === 0 ? 'Xoá' : 'Khôi phục',
      icon: currentTab === 0 ? 'pi pi-trash' : 'pi pi-refresh',
      command: currentTab === 0 ? (() => deleteAnAccount(selectedAccountId)) : (() => restoreAnAccount(selectedAccountId)),
    }
  ];

  const deleteAnAccount = (id) => {
    if (selectedAccountId !== null) {
      if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
        setLoading(true);
        deleteAccount(id)
          .then(() => {
            setLoading(false);
            refreshTableData();
            toast.current.show({ severity: 'success', summary: 'Đã xoá', detail: 'Tài khoản đã bị xoá', life: 3000 });
          })
          .catch((error) =>
            toast.current.show({ severity: 'error', summary: 'Chưa xoá', detail: `Đã xảy ra lỗi, vui lòng thử lại. ${JSON.stringify(error)}`, life: 3000 }));
      }
    }
  }

  const restoreAnAccount = (id) => {
    if (selectedAccountId !== null) {
      setLoading(true);
      restoreAccount(id)
        .then(() => {
          setLoading(false);
          refreshTableData();
          toast.current.show({ severity: 'success', summary: 'Đã khôi phục', detail: 'Tài khoản đã được khôi phục', life: 3000 });
        })
        .catch((error) => toast.current.show({ severity: 'error', summary: 'Chưa khôi phục', detail: `Đã xảy ra lỗi, vui lòng thử lại. ${JSON.stringify(error)}`, life: 3000 }));
    }
  }

  useEffect(() => {
    refreshTableData();
  }, [])

  useEffect(() => {
    if (currentTab === 1) {
      setShowingData(deletedTableData);
    } else {
      setShowingData(activeTableData);
      refreshTableData();
    }
  }, [currentTab]);

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    setLoading(true);
    getAccountsList(offset, pageSize)
      .then((accounts) => {
        setLoading(false);
        setShowingData(accounts.items);
        setActiveTableData(accounts.items.filter((item) => !item.deletedOn));
        setTotalPages(accounts.totalPages);
      })
      .catch((error) => console.log(error));

    getDeletedAccountsList()
      .then((accounts) => {
        setDeletedTableData(accounts);
      });
  }, [currentPage, pageSize]);

  return (
    <>
      <Toast ref={toast} />
      <Container maxWidth={settings.themeStretch ? false : 'lg'} style={{ position: "relative" }}>
        {loading && <ProgressSpinner style={{ position: "absolute", top: "15rem", zIndex: "5" }} />}
        <Card>
          <TabView activeIndex={currentTab} onTabChange={(e) => setCurrentTab(e.index)}>
            <TabPanel headerTemplate={(options) => tabHeaderTemplate(options, { label: 'Hoạt động', value: 'active' }, 0)} headerClassName="flex align-items-center">
              <DataTable value={showingData} header={() => renderHeader()} headerStyle={{ borderRadius: "12px" }} columnResizeMode="expand" resizableColumns showGridlines rowHover rows={pageSize}
                paginator
                rowsPerPageOptions={[10, 20, 50]}
                totalRecords={activeTableData.length}
                onPageChange={(e) => setCurrentPage(e.first / e.rows + 1)}
                onRowsPerPageChange={(e) => setPageSize(e.value)}
              >

                <Column frozen headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                <Column frozen field="fullname" header="Tên đầy đủ" sortable style={{ minWidth: '14rem' }} />
                <Column field="username" header="Username" sortable style={{ minWidth: '14rem' }} />
                <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                <Column field="role" header="Vai trò" sortable style={{ minWidth: '14rem' }} body={roleBodyTemplate} />
                <Column field="status" header="Trạng thái" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                <Column field="bio" header="Giới thiệu" style={{ minWidth: '12rem' }} />
                <Column field="createdOn" header="Tạo lúc" style={{ minWidth: '12rem' }} body={(rowData) => fDateTime(rowData.createdOn, "dd/MM/yyyy HH:mm:ss")} />
              </DataTable>
            </TabPanel>
            <TabPanel headerTemplate={(options) => tabHeaderTemplate(options, { label: 'Đã xóa', value: 'deleted' }, 1)} headerClassName="flex align-items-center">
              <DataTable frozenWidth="200px" value={deletedTableData} header={() => renderHeader()} rowHover >
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                <Column frozen field="fullname" header="Tên đầy đủ" sortable style={{ minWidth: '14rem' }} />
                <Column field="username" header="Username" sortable style={{ minWidth: '14rem' }} />
                <Column field="email" header="Email" sortable style={{ minWidth: '14rem' }} />
                <Column field="role" header="Vai trò" sortable style={{ minWidth: '14rem' }} body={roleBodyTemplate} />
                <Column field="status" header="Trạng thái" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
                <Column field="bio" header="Giới thiệu" style={{ minWidth: '12rem' }} />
                <Column field="deletedOn" header="Xoá lúc" style={{ minWidth: '12rem' }} body={(rowData) => fDateTime(rowData.deletedOn, "dd/MM/yyyy HH:mm:ss")} />
              </DataTable>
            </TabPanel>
            <p className='hidden'> {totalPages}</p>
            {/* <TabPanel header={
              <Button
                className='create-account-button'
                target='_blank'
                href='https://artworkia-4f397.web.app/register'
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Tạo tài khoản
              </Button>}
              headerClassName="flex align-items-center" /> */}
          </TabView>
        </Card>
      </Container>
    </>
  );
}
