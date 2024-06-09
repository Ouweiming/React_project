import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import G2Chart from './G2Chart';
import { FloatButton } from 'antd';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // 导入高亮样式
import { motion } from 'framer-motion';
import Loading from './loading';
import Header from './header';
import Footer from './footer';
import Parallax from './Parallax';
import pig from './assets/pig.png';
import firework1 from './assets/咩1.png';
import firework2 from './assets/咩2.png';
import firework3 from './assets/咩3.png';
import firework4 from './assets/咩4.png';
import firework5 from './assets/咩5.png';
import firework6 from './assets/咩6.png';
import firework7 from './assets/咩7.png';
import firework8 from './assets/咩8.png';
import firework9 from './assets/咩9.png';
import { useTheme } from './theme-provider';

const Homepage = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 以为可以悄悄加载页面，然而并没有啥用：）
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟2秒的加载时间
      setIsLoading(false);
    };

    loadData();
  }, []);

  const markdown = `
## 页面有点简陋：）很多效果尚未实现，摸下\ud83d\udc37头哈哈哈哈
---
### Data Visualization:
`;

  const markdown_ = `
---


- **数据描述**：
  - 该散点图显示了年龄（Age）与血红蛋白水平（Hemoglobin）之间的关系。横轴代表年龄，纵轴代表血红蛋白水平。每个数据点代表一个样本，其在图中的位置由其年龄和血红蛋白水平的值决定。

- **交互性**：
  - 用户可以通过拖动年龄段或血红蛋白含量来观察不同数据点的分布情况。一定程度上帮助用户更直观地理解数据，并发现可能存在的模式或趋势。
  - 另外，用户还可以通过点击图例来观察不同性别的血红蛋白含量情况。一定程度上助于用户更深入地探索数据，并比较不同组之间的差异。

- **不足之处**：
  - 并未使用R语言进行数据可视化，shiny包在这种情况下貌似并不管用？暂时还没找到其他适合的R包：） 我认为大概率是要自己写后端调用R语言并返回数据和图给前端，实现前后端交互，等淦完ddl再好好折腾下：）
  - 由于数据量较少，散点图的可视化结果可能会有一定的误差。通常情况下，数据量越大，散点图的结果越能够准确地反映数据的真实情况。
  - 此外，如果数据量过大，散点图的渲染时间可能会过长，并且交互性能可能会受到影响，从而影响用户体验。
  - 近期了解到可以考虑使用数据分段加载等技术来减少渲染时间和提高交互性能，后续深究一下。现在使用的是G2库渲染可视化数据，或许也可以尝试采用ECHARTS提高性能。
---
  `;

  const MainContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFloatButtonRotated, setIsFloatButtonRotated] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      setIsFloatButtonRotated(!isFloatButtonRotated); // 旋转 FloatButton
    };

    return (
      <main className="container flex-auto">
        {/* 侧边栏图标 */}
        <div onClick={toggleSidebar}>
          <FloatButton
            tooltip={<div>Data Visualization</div>}
            className={`fixed top-1/2 transform-gpu transition-transform duration-500 ${isFloatButtonRotated ? 'rotate-180' : ''}`} // 使用 Tailwind CSS 类实现按钮旋转
            icon={<div><img src={pig} alt="svg" /></div>}
          />
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </main>
    );
  };

  {/* 侧边栏 */}
  const Sidebar = ({ isOpen }) => {
    // 使用 react-spring 的 useSpring 钩子来定义侧边栏动画
    const sidebarAnimation = useSpring({
      transform: isOpen ? 'translateX(0%)' : 'translateX(100%)', // 打开时从右侧平移进来，关闭时向右侧平移出去
      opacity: isOpen ? 1 : 0, // 显示或隐藏侧边栏
      config: { tension: 200, friction: 20 } // 调整动画的张力和摩擦力
    });

    return (
      <animated.aside
        className={` flex rounded-3xl fixed right-0 top-1/4 max-h-full bg-white bg-opacity-65 overflow-y-auto z-50`}
        style={sidebarAnimation}
      >
        <div className="flex flex-col flex-wrap justify-center items-center h-full px-4 py-2">
          <div>
            <p className='flex justify-center text-cyan-700 font-bold text-lg'>Hah!You found me!</p>
            <G2Chart />
          </div>
        </div>
      </animated.aside>
    );
  };

  const PhotoWall = () => {
    const photos = [
      firework1,
      firework2,
      firework3,
      firework4,
      firework5,
      firework6,
      firework7,
      firework8,
      firework9,
      
      // 添加更多照片链接
    ];
  
    return (
      <>
    <div className="flex flex-col justify-center items-center text-lg font-bold text-cyan-600 space-y-4">
     <p>ScrollTrigger写得有点烂：（</p>
     <p>给uu们放个烟花吧~</p>
    </div>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 p-8 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              className="w-full h-auto rounded-lg filter brightness-100 blur-sm transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105 hover:blur-none"
              src={photo}
              alt={`Photo ${index}`}
            />
          </div>
        ))}
      </div>
      </>
    );
  };
  


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <FloatButton.BackTop/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 2}}  >
      
        <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>

          <Header /> 
          <Parallax />
          <MainContent />

          <section className={`mb-8 container ml-3.5 p-6 prose ${theme === 'dark' ? 'prose-dark' : ''}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown}</ReactMarkdown>
          </section>

          <div className={`flex align-middle justify-center top-10 m-auto rounded-3xl ${theme === 'dark' ? 'dark:bg-gray-300' : ''}`}>
            <G2Chart />
          </div>

          <section className={`mb-8 container mx-auto p-4 prose ${theme === 'dark' ? 'prose-dark' : ''}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown_}</ReactMarkdown>
          </section>

          <PhotoWall/>
          <Footer />

        </div>
      </motion.div>
      </>
    );
  };
  
  export default Homepage;
  
