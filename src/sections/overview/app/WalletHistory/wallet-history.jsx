import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function WalletHistory(walletHistoryList) {
  const { walletHistory } = walletHistoryList;
  const typeRowTemplate = (rowData) => (
      <span
        className={
          rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"
        }
      >
        {rowData.type === "Nạp tiền" ? (
          <i className="pi pi-arrow-down mr-1" />
        ) : (
          <i className="pi pi-arrow-up mr-1" />
        )}
        {rowData.type}
      </span>
    );

  const amountRowTemplate = (rowData) => (
      <span
        className={
          rowData.type === "Nạp tiền" ? "text-blue-600" : "text-red-500"
        }
      >
        {rowData.type === "Nạp tiền" ? (
          `+${rowData.amount.toLocaleString()}`
        ) : (
          `-${rowData.amount.toLocaleString()}`
        )}

      </span>
    );

  const statusRowTemplate = (rowData) => (
      <span
        style={{
          width: "fit-content",
          backgroundColor:
            rowData.transactionStatus === "Thành công" ? "green" : "red",
          padding: "0.25rem 0.5rem",
          borderRadius: "1rem",
          color: "white",
          textAlign: "center",
        }}
      >
        {rowData.transactionStatus}
      </span>
    );

  return (
    <DataTable
      value={walletHistory}
      className="w-full"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      emptyMessage="Hãy nạp thêm Xu để trải nghiệm các dịch vụ của Artworkia nhé!"
    >
      <Column field="type" header="Loại" body={typeRowTemplate} sortable />
      <Column field="paymentMethod" header="Phương thức" sortable />
      <Column field="amount" header="Số lượng (Xu)" body={amountRowTemplate} sortable />
      <Column
        field="transactionStatus"
        header="Trạng thái"
        body={statusRowTemplate}
        style={{ display: 'flex' }}
        sortable
      />
      <Column field="createdOn" header="Ngày tạo" sortable />
    </DataTable>
  );
}

WalletHistory.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  walletHistory: PropTypes.array,
};
