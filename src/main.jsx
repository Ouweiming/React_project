import * as React from 'react';
import ReactDOM from 'react-dom/client'; // 确保从 'react-dom/client' 导入
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Home from './Homepage'; // 正确的导入路径
import Introduction from './Introduction'; // 正确的导入路径
import Resume from './Resume'; // 正确的导入路径
import './index.css';

const App = () => (
  <NextUIProvider>
    <Routes>
      <Route path="/" element={<Home />} /> {/* 将 Homepage 的路径更改为 "/" */}
      <Route path="/Homepage" element={<Home />} /> {/* 将 Homepage 的路径更改为 "/" */}
      <Route path="/Introduction" element={<Introduction />} /> {/* 正确的路径 */}
      <Route path="/Resume" element={<Resume />} /> {/* 正确的路径 */}
    </Routes>
  </NextUIProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
