import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Use Routes from react-router-dom instead of Router
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from './Components/Login/Login';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import SignUp from "./Components/SignUp/SignUp";
import ESG from './Components/ESG/ESG';
import CAGRCalculator from './Components/CAGR/CAGRCalculator';
import ROICalculator from './Components/ROI/ROICalculator';
import SIPCalculator from './Components/SIP/SIPCalculator';
import TradingView from './Components/Watchlist/TradingView';
import { SymbolOverview } from 'react-ts-tradingview-widgets';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import Dashboard, {Dashboar} from './Components/Dashboard folder/Dashboard';
import Forum from './Components/Forum/forum';
import Transactions from './Components/Transactions/Transactions';
import EducationComp from './Components/Education/EducationComp';
import PrivateRoutes from './Components/PrivateRoutes';


function App() {
  return (
    
    <BrowserRouter>
      <div>
      <CustomNavbar />
        <Routes> {/* Use Routes instead of Router */}
          <Route path='' element={<LandingPage />} />
          <Route path='register' element={<SignUp />} />
          <Route path='login' element={<Login />} />
          <Route path='CagrCalculator' element={<CAGRCalculator />}/>
          <Route path='roi-calculator' element={<ROICalculator />} />
          <Route path='SIP Calculator' element={<SIPCalculator />} />
          <Route element={<PrivateRoutes/>}>
          <Route path='esg' element={<ESG/>} />
          {/* <Route path='CagrCalculator' element={<CAGRCalculator />}/>
          <Route path='roi-calculator' element={<ROICalculator />} />
          <Route path='SIP Calculator' element={<SIPCalculator />} /> */}
          <Route path='watchlist' element={<TradingView />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='forum' element={<Forum/>} />
          <Route path='transactions' element={<Transactions/>} />
          <Route path='education' element={<EducationComp/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    

// {/* <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart> */}

    
  );
}

export default App;
