/* eslint-disable react-hooks/exhaustive-deps */

import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useRef, useState, useEffect } from 'react';
import { Button as ButtonPr } from 'primereact/button';
import { Tooltip as TooltipPr } from 'primereact/tooltip';
import { ProgressSpinner } from 'primereact/progressspinner';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import './category-list-view.scss';
import { deleteCategory, updateCategory, createCategory, getCategoriesList } from '../service/category-service';

export default function CategoryListView() {
  const toast = useRef(null);
  const settings = useSettingsContext();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [showingData, setShowingData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
      <h3 className="m-0">Các thể loại trên hệ thống</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={() => { }} onChange={() => { }} placeholder="Tìm kiếm" />
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData) => <>
    <Menu model={actionItems} popup ref={menuRef} id="popup_menu" />
    <ButtonPr disabled={loading} loading={loading} icon="pi pi-cog" className="mr-2" onClick={(event) => { menuRef.current.toggle(event); setSelectedCategoryId(rowData.id); }} aria-controls="popup_menu" aria-haspopup />
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
    getCategoriesList()
      .then((categories) => {
        setLoading(false);
        setShowingData(categories);
      })
      .catch((error) => handleUnauthError(error));
  }

  const actionItems = [
    {
      label: 'Xoá',
      icon: 'pi pi-trash',
      command: () => deleteACategory(selectedCategoryId),
    },
  ];

  const deleteACategory = (id) => {
    if (selectedCategoryId !== null) {
      if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
        setLoading(true);
        deleteCategory(id)
          .then(() => {
            setLoading(false);
            refreshTableData();
            toast.current.show({ severity: 'success', summary: 'Đã xoá', detail: 'thể loại đã bị xoá', life: 3000 });
          })
          .catch((error) => handleUnauthError(error))
      }
    }
  }

  const createNewCategory = () => {
    if (newCategoryName.trim() !== '') {
      setLoading(true);
      createCategory(newCategoryName)
        .then(() => {
          setLoading(false);
          setNewCategoryName('');
          refreshTableData();
          toast.current.show({ severity: 'success', summary: 'Đã tạo', detail: 'thể loại mới đã được tạo', life: 3000 });
        })
        .catch((error) => handleUnauthError(error));
    } else {
      toast.current.show({ severity: 'error', summary: 'Không hợp lệ', detail: 'Vui lòng nhập tên thể loại', life: 3000 });
    }
  };

  const onCellEditComplete = (e) => {
    const { rowData, newValue } = e;

    if (newValue.trim().length > 0) {
      setLoading(true);
      updateCategory(rowData.id, newValue)
        .then(() => {
          setLoading(false);
          refreshTableData();
          toast.current.show({ severity: 'success', summary: 'Đã sửa', detail: 'thể loại đã được cập nhật', life: 3000 });
        })
        .catch((error) => handleUnauthError(error));
    } else {
      toast.current.show({ severity: 'error', summary: 'Không hợp lệ', detail: 'Vui lòng nhập tên thể loại', life: 3000 });
    }
  };

  const textEditor = (options) => <InputText type="text" tooltip='Nhấp vào ô khác để lưu' value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;

  useEffect(() => {
    refreshTableData();
  }, [])

  return (
    <>
      <Toast ref={toast} />
      <TooltipPr target=".categoryName-cell" content="Nhấp vào để Sửa" />
      <TooltipPr target=".p-column-header-content" content="Nhấp vào từng ô bên dưới để Sửa" />
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Card>
          <DataTable value={showingData} editMode="cell" header={() => renderHeader()} headerStyle={{ borderRadius: "12px" }} columnResizeMode="expand" resizableColumns showGridlines>
            {loading && <ProgressSpinner />}
            <Column className="categoryName-cell" field="categoryName" header="Tên thể loại" sortable style={{ minWidth: '14rem' }} editor={(options) => textEditor(options)} onCellEditComplete={onCellEditComplete} editorValidator={(e) => e.value.trim().length > 0} />
            <Column field="parent" header="Thể loại cha" sortable style={{ minWidth: '14rem' }} />
            <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
          </DataTable>
          <div className="flex align-items-center mt-3">
            <InputText
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nhập tên thể loại mới"
              style={{ marginRight: '10px' }}
            />
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={createNewCategory}
              disabled={loading}
            >
              Tạo thể loại
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}