import React, { useEffect, useState } from "react";
import { transactions } from "../../services/transactions";

function Transactions() {
  const [transactionData, setTransactionData] = useState([]);
  const fetchData = async () => {
    const { data } = await transactions();
    setTransactionData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <table>
      <tr>
        <th>Transaction ID</th>
        <th>Amount</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
      {transactionData.map((transaction) => (
        <tr>
          <td>{transaction.id}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.created}</td>
          <td>{transaction.status}</td>
        </tr>
      ))}
    </table>
  );
}

export default Transactions;
