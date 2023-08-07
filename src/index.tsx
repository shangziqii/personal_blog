import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from './router'

/* import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; */

// import App from './pages/Index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={globalRouters} />
  </React.StrictMode>
);

