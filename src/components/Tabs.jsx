import React, { useState } from 'react';
import '../styles/tabs.css';

const defaultTabsData = [
  {
    label: "Profile",
    content: <div>Profile Info Content</div>,
  },
  {
    label: "Dashboard",
    content: <div>Dashboard Content</div>,
  },
  {
    label: "Settings",
    content: <div>Settings Content</div>,
  },
  {
    label: "Invoice",
    content: <div>Invoice Content</div>,
  },
];

function Tabs({ tabsData = defaultTabsData, onChange }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <div className="tabs">
      <div className="tabs__container">
        {tabsData.map((item, ind) => {
          return (
            <button
              key={ind}
              className={`${currentTabIndex === ind ? 'activeTab' : ''}`}
              onClick={() => {
                setCurrentTabIndex(ind);
                onChange(ind);  //onChange is nothing but an input function passed to tabs from parent. So that parent can perform some operation. Just like Angular event emitter output
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="tabs__content">{tabsData[currentTabIndex].content}</div>
    </div>
  )
}

export default Tabs