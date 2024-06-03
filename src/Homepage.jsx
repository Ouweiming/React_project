import React, { useState} from 'react';
import { useSpring, animated } from '@react-spring/web';
import G2Chart from './G2Chart';
import { FloatButton } from 'antd';
import Header from './header';
import Footer from './footer';
import Parallax from './Parallax';
import pig from './assets/pig.png';
import './index.css';


const Sidebar = ({ isOpen }) => {
  // 使用 react-spring 的 useSpring 钩子来定义侧边栏动画
  const sidebarAnimation = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)', // 打开时从右侧平移进来，关闭时向右侧平移出去
    opacity: isOpen ? 1 : 0, // 显示或隐藏侧边栏
    config: { tension: 200, friction: 20 } // 调整动画的张力和摩擦力
  });

  return (
    <animated.aside
      className={`text-black fixed top-0 right-0 h-full bg-white bg-opacity-80 overflow-y-auto z-50`}
      style={sidebarAnimation}
    >
      <div className="flex flex-col justify-center items-center h-full px-4 py-2">
        <div>
          <p className='flex justify-center text-emerald-400'>Surprise! 这是我的分身😎</p>
          <G2Chart />
        </div>
      </div>
    </animated.aside>
  );
};


const MainContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="containe flex-auto p-20">
      
      <div className="flex-grow mx-auto py-8 flex-auto">
        


</div>



     
      {/* 侧边栏图标 */}
      <div
        onClick={toggleSidebar}
        >
       
        
       <FloatButton  tooltip={<div>Data Visualization</div>}  style={{bottom:500}} icon={<div><img src={pig} alt="svg" /></div>}/>
      </div>
      {/* 侧边栏 */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </main>
  );
};

const Home = () => (
  
    <div className="flex flex-col min-h-screen">
     
     <Header/>
     <Parallax/>
     <div className='flex align-middle justify-center '>
     <G2Chart/>
     </div>
      <div className="p-60 flex-grow flex flex-col items-center justify-center bg-gray-100 ">
            
        <MainContent />
      </div> 
      <Footer />
    </div>

  
);

export default Home;
