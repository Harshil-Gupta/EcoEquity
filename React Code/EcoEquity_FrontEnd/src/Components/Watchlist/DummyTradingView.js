import React from 'react'
import {
    AdvancedRealTimeChart,
    Ticker,
    FundamentalData,
    SymbolInfo,
  } from "react-ts-tradingview-widgets";
const DummyTradingView = () => {
    const selectedSymbol = "AAPL";
  return (
   <>
      <Ticker colorTheme="light" />
    <div className="mt-3">
          <SymbolInfo
            colorTheme="light"
            symbol={selectedSymbol}
            autosize
          ></SymbolInfo>
        </div> 

         <div className="mt-3">
          <AdvancedRealTimeChart
            symbol={selectedSymbol}
            theme="light"
            show_popup_button={true}
            width="100%"
            watchlist={[
              "NWG",
              "AAPL",
              "GOOGL",
              "V",
              "MSFT",
              "AMZN",
              "FB",
              "TSLA",
              "META",
              "WMT",
              "BRK.A",
            ]}
          />
        </div> 

         <div className="mt-3">
          <FundamentalData
            symbol={selectedSymbol}
            colorTheme="light"
            height={400}
            width="100%"
          />
        </div>
   </>
  )
}

export default DummyTradingView
