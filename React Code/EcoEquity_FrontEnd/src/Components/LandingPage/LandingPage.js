import React from 'react'
import Aboutus from './AboutUs'
import Calculator from './Calculator'
import CarouselofLandingPage from './CarousekofLandingPage'
import Footer from './Footer'
import Ticker from './Ticker/Ticker'
import StockROI from './Nifty50/StockTableGoogl'
import StockTimelineWidget from './StockTimeline/StockTimelinewidget'
import CustomNavbar from '../Navbar/CustomNavbar';
import {Timeline} from "react-ts-tradingview-widgets";

function LandingPage() {
  return (
    <div >
    <CarouselofLandingPage />
    <br/>
    <Ticker/>
    <Aboutus />
    <StockROI />
    <Calculator />
    <div className='container'>

    {/* <StockTimelineWidget /> */}
    <br/>
    <br/>

    <Timeline width="100%" colorTheme='light' market='stock' feedMode='market'/>
    </div>
    <Footer />
    </div>
  )
}

export default LandingPage