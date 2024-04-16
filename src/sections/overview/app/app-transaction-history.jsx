import { TabMenu } from 'primereact/tabmenu';
import React, { useState, useEffect } from "react";

import "./style/app-transaction-history.scss";
import WalletHistory from './WalletHistory/wallet-history';
import TransactionHistory from "./TransactionHistory/transaction-history";
import { GetWalletHistoryData, GetTransactionHistoryData } from "./view/Service";


export default function AppTransactionHistory () {
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [walletHistory, setWalletHistory] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const items = [
    { label: "Lịch sử rút nạp xu" },
    { label: "Lịch sử giao dịch xu" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 0) {
          const walletHistoryList = await GetWalletHistoryData();
          setWalletHistory(walletHistoryList);
        } else {
          const transactionHistoryList = await GetTransactionHistoryData();
          setTransactionHistory(transactionHistoryList);
        }
      } catch (error) {
        console.log("Lỗi: ", error);
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh, activeTab]);

  return (
    <div className="wallet-view">
      <div className="history-section">
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
          className="tab-menu w-max mb-3 text-black-alpha-90"
        />

        {activeTab === 0 ? (
          <WalletHistory walletHistory={walletHistory} />
        ) : (
          <TransactionHistory transactions={transactionHistory} />
        )}
      </div>
    </div>
  );
};

