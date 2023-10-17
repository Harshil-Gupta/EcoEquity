import React from "react";
import { BsGrid1X2Fill, BsArrowRight } from "react-icons/bs";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">India's No.1 Stock Market App</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/Watchlist">
            <FaChartLine className="icon" />
            Stock Watchlist
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/transactions">
            <CreditCardIcon className="icon" />
            Transaction History
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/education">
            <FaGraduationCap className="icon" />
            Education
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/forum">
            <FaComment className="icon" />
            Forum
          </Link>
        </li>
      </ul>
      <div className="sidebar-list-item">
        <Link to="/esg">
          <span>Go to ESG Page</span>
          <BsArrowRight className="icon" />
        </Link>
      </div>
      <div className="sidebar-carousel">
        <div className="carousel-content">
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
          >
            <div>
              <img
                src="https://thumbs.dreamstime.com/z/esg-environmental-social-governance-business-227863408.jpg?w=992"
                alt="Carousel 1"
                height="130"
                width="992"
              />
            </div>

            <div>
              <img
                src="https://thumbs.dreamstime.com/z/esg-icon-concept-crystal-globe-environmental-social-governance-sustainable-ethical-business-network-tcrystal-259144397.jpg?w=992"
                alt="Carousel 2"
                height="130"
                width="992"
              />
            </div>
            <div>
              <img
                src="https://thumbs.dreamstime.com/z/esg-environmental-social-governance-sustainable-to-businessman-strategy-221300638.jpg?w=992"
                alt="Carousel 3"
                height="130"
                width="992"
              />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="sidebar-title">
      <div className="sidebar-brand">A Product by NatWest Group</div>
</div>
    </aside>
  );
}

export default Sidebar;
