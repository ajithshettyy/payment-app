import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Payment from "./components/Payment";
import Transactions from "./components/Transactions";

import "react-tabs/style/react-tabs.css";
import "animate.css";
import "./App.css";

// test

function App() {
  return (
    <div className="app">
      <Tabs>
        <TabList>
          <Tab>Payment</Tab>
          <Tab>Transactions</Tab>
        </TabList>
        <TabPanel>
          <div className="container">
            <Payment></Payment>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="container">
            <Transactions></Transactions>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
