import React, { useState, createContext, useContext, useEffect } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import reactIcon from './assets/react.svg';
import G2Chart from './G2Chart';


// 创建暗黑模式上下文
const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState('system');

  useEffect(() => {
    const storedMode = localStorage.getItem('theme') || 'system';
    setMode(storedMode);
  }, []);

  useEffect(() => {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (mode === 'system') {
      document.documentElement.classList.toggle('dark', systemDarkMode);
    } else {
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const config = { mass: 3, tension: 200, friction: 30 };
const starPaths = [
  'M25 10L31.7523 28.2477L50 35L31.7523 41.7523L25 60L18.2477 41.7523L0 35L18.2477 28.2477L25 10Z',
  'M71.5 42L76.2266 54.7734L89 59.5L76.2266 64.2266L71.5 77L66.7734 64.2266L54 59.5L66.7734 54.7734L71.5 42Z',
  'M61 0L63.7009 7.29909L71 10L63.7009 12.7009L61 20L58.2991 12.7009L51 10L58.2991 7.29909L61 0Z',
];

function DarkModeToggle() {
  const { mode, setMode } = useContext(DarkModeContext);
  const isDarkMode = mode === 'dark';

  const starPathTransitions = useTransition(isDarkMode ? starPaths : [], {
    from: { scale: 0, rotate: -30, opacity: 0 },
    enter: { scale: 1, rotate: 0, opacity: 1 },
    leave: { scale: 0, rotate: -30, opacity: 0 },
    trail: 150,
  });

  const cloudStyles = useSpring({
    opacity: isDarkMode ? 0 : 1,
    x: isDarkMode ? -5 : 0,
    config,
  });

  const nodeStyles = useSpring({
    x: isDarkMode ? 28 : 0,
    rotate: isDarkMode ? 0 : 180,
    backgroundColor: isDarkMode ? '#c6d0d1' : '#fde047',
    config,
  });

  const containerStyles = useSpring({
    backgroundColor: isDarkMode ? '#475569' : '#7dd3fc',
    config,
  });

  const craterStyles = useSpring({
    opacity: isDarkMode ? 1 : 0,
    config,
  });

  const stars = (
    <svg className="absolute left-[8px] top-[7px]" width="16" height="14" viewBox="0 0 89 77" fill="none" xmlns="http://www.w3.org/2000/svg">
      {starPathTransitions((styles, path) => (
        <animated.path key={path} style={{ ...styles, transformBox: 'fill-box', transformOrigin: 'center' }} d={path} fill="#C6D0D1"/>
      ))}
    </svg>
  );

  const clouds = (
    <animated.svg style={cloudStyles} className="absolute right-[10px] top-[10px]" width="15" height="8" viewBox="0 0 104 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.0258 11.2704C18.0258 5.34458 22.8296 0.540771 28.7554 0.540771H93.1331C99.0589 0.540771 103.863 5.34458 103.863 11.2704C103.863 17.1962 99.0589 22 93.1331 22H66.2146C63.3038 22 60.9442 24.3596 60.9442 27.2704V27.2704C60.9442 30.1811 63.3038 32.5408 66.2146 32.5408H75.1073C81.0331 32.5408 85.8369 37.3446 85.8369 43.2704C85.8369 49.1962 81.0331 54 75.1073 54H10.7296C4.80381 54 0 49.1962 0 43.2704C0 37.3446 4.80381 32.5408 10.7296 32.5408H44.7296C47.6404 32.5408 50 30.1811 50 27.2704V27.2704C50 24.3596 47.6404 22 44.7296 22H28.7554C22.8296 22 18.0258 17.1962 18.0258 11.2704Z" fill="white"/>
    </animated.svg>
  );

  const handleClick = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setMode(newMode);
  };

  return (
    <animated.div
      style={containerStyles}
      className="relative w-[56px] h-[28px] rounded-full p-[5px] cursor-pointer"
      onClick={handleClick}
    >
      {stars}
      {clouds}
      <animated.div style={nodeStyles} className="relative w-[18px] h-[18px] rounded-full z-10">
        <animated.div style={craterStyles} className="relative w-full h-full">
          <div className="absolute top-[6px] left-[4px] w-[4px] h-[4px] rounded-full bg-slate-400/50 shadow-inner" />
          <div className="absolute top-[8px] left-[11px] w-[1px] h-[1px] rounded-full bg-slate-400/50 shadow-inner" />
          <div className="absolute top-[11px] left-[9px] w-[2px] h-[2px] rounded-full bg-slate-400/50 shadow-inner" />
        </animated.div>
      </animated.div>
    </animated.div>
  );
}

const MyHeader = () => {
  useContext(DarkModeContext);
  const [isHovered, setIsHovered] = useState(false);
  // React Spring animation for rotating the icon
  
  const rotate = useSpring({
    loop: true,
    from: { transform: 'rotate(0deg)' },
    to: [
      { transform: 'rotate(360deg)', config: { duration: isHovered ? 900 : 3000 } }
    ]
  });
  const [styles, api] = useSpring(() => ({ from: { transform: 'translateY(-100%)' } }));

  useEffect(() => {
    api.start({ transform: 'translateY(0)' });
  }, [api]);

  // 动态渐变背景色
  const gradient = useSpring({
    loop: true,
    from: { background: 'linear-gradient(to right, #1e3a8a, #3b82f6)' }, // 深蓝到蓝色
    to: async (next) => {
      while (1) {
        await next({ background: 'linear-gradient(to right, #1e3a8a, #3b82f6)' }); // 深蓝到蓝色
        await next({ background: 'linear-gradient(to right, #3b82f6, #60a5fa)' }); // 蓝色到浅蓝色
        await next({ background: 'linear-gradient(to right, #60a5fa, #34d399)' }); // 浅蓝色到绿松石
        await next({ background: 'linear-gradient(to right, #34d399, #10b981)' }); // 绿松石到绿色
        await next({ background: 'linear-gradient(to right, #10b981, #1e3a8a)' }); // 绿色到深蓝
      }
    },
    config: { duration: 2500, easing: t => t }
  });

  return (
    <animated.header style={{ ...styles, ...gradient }} className="p-5 text-2xl sm:text-3xl font-bold bg-opacity-80 text-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4">
        <div className="flex items-center">
          <animated.img src={reactIcon} alt="React Icon" className="mr-6 w-12 h-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} style={rotate} />
          <nav className="ml-6">
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">Home</a>
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">About</a>
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">Services</a>
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">Contact</a>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
            <DarkModeToggle />
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">Login</a>
            <a href="#" className="text-white hover:text-cyan-300 px-3 py-2">Sign Up</a>
        </div>
      </div>
    </animated.header>
  );
};

const MyButton = ({ onClick }) => (
  <button
    className="px-4 py-2 rounded-2xl flex justify-around bg-pink-300 text-white text-lg font-semibold hover:bg-pink-400 shadow-lg transition duration-150 ease-in-out"
    onClick={onClick}
  >
    咩🐑
  </button>
);

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarAnimation = useSpring({
    width: isOpen ? '250px' : '0px',
    opacity: isOpen ? 1 : 0,
    config: { duration: 250 }
  });

  return (
    <animated.aside
      className={`text-black dark:text-white fixed top-0 right-0 h-full bg-gray-200 dark:bg-gray-800 overflow-y-auto z-50`}
      style={sidebarAnimation}
    >
      <div className="px-4 py-2">
        <h2 className="text-center text-xl font-bold">侧边栏</h2>
        <p className="text-center mt-2 text-gray-700 dark:text-gray-300">你干嘛哎哟~~~</p>
        <button className="mt-4 px-3 py-1 rounded-md bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-500 dark:hover:bg-gray-600" onClick={onClose}>
          关闭侧边栏
        </button>
      </div>
    </animated.aside>
  );
};


const MainContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const rotate = useSpring({
    loop: true,
    from: { transform: 'rotate(0deg)' },
    to: [
      { transform: 'rotate(360deg)', config: { duration: isHovered ? 900 : 3000 } }
    ]
  });

  return (
    <main className="containe flex-auto p-20">
      <G2Chart/>
      <div className="flex-grow mx-auto py-8 flex-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="text-lg mb-4">This is the content for section 1.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="text-lg mb-4">This is the content for section 1.</p>
        </section><section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="text-lg mb-4">This is the content for section 1.</p>
        </section><section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="text-lg mb-4">This is the content for section 1.</p>
        </section><section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="text-lg mb-4">This is the content for section 1.</p>
        </section>
      </div>
      
      <div className="container grid grid-flow-col grid-rows-2 grid-cols-3 gap-20">
  <div className="border rounded-lg transform scale-100 -rotate-6 w-80 h-80">
    <img className="rounded-lg object-cover w-full h-full" src="src/assets/mountains-1.jpg" alt="" loading="lazy" />
  </div>
  <div className="border rounded-lg col-start-3 transform scale-100 rotate-6 translate-x-2 translate-y-15 w-80 h-80">
    <img className="rounded-lg object-cover w-full h-full" src="src/assets/mountains-2.jpg" alt="" loading="lazy" />
  </div>
  <div className="border rounded-lg transform scale-100 translate-y-11 w-80 h-80">
    <img className="rounded-lg object-cover w-full h-full" src="src/assets/mountains-3.jpg" alt="" loading="lazy" />
  </div>
  <div className="border rounded-lg transform translate-y-24 w-80 h-80">
    <img className="rounded-lg object-cover w-full h-full" src="src/assets/mountains-4.jpg" alt="" loading="lazy" />
  </div>
  <div className="border rounded-lg row-start-1 col-start-2 col-span-2 transform translate-x-20 translate-y-4 w-150 h-80">
    <img className="rounded-lg object-cover w-full h-full" src="src/assets/mountains-5.jpg" alt="" loading="lazy" />
  </div>
</div>



     
      {/* 侧边栏图标 */}
      <animated.div
        className="fixed right-2 bottom-1/2 transform translate-y-1/2 cursor-pointer"
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={rotate}
      >
        {/* 假设箭头图标为SVG格式，文件名为arrow.svg */}
        <img src={reactIcon} alt="Sidebar Icon" className="size-9" />
      </animated.div>
      {/* 侧边栏 */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-white w-full mt-auto">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold mb-4">Company</h2>
          <ul>
            <li><a href="privacy-policy.html" className="hover:underline hover:text-cyan-300">隐私政策</a></li>
            <li><a href="terms-of-service.html" className="hover:underline hover:text-cyan-300">服务条款</a></li>
            <li><a href="sitemap.html" className="hover:underline hover:text-cyan-300">网站地图</a></li>
          </ul>
        </div>
        {/* Column 2 */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <ul>
            <li><a href="https://www.facebook.com/yourpage" target="_blank" className="hover:underline hover:text-cyan-300">Facebook</a></li>
            <li><a href="https://www.twitter.com/yourpage" target="_blank" className="hover:underline hover:text-cyan-300">Twitter</a></li>
            <li><a href="https://www.instagram.com/yourpage" target="_blank" className="hover:underline hover:text-cyan-300">Instagram</a></li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p>联系电话: (123) 456-7890</p>
          <p>联系邮箱: <a href="mailto:info@example.com" className="hover:underline hover:text-cyan-300">info@example.com</a></p>
        </div>
        {/* Column 4 */}
        <div>
          <h2 className="text-xl font-bold mb-4">Legal</h2>
          <p>&copy; 咩咩咩🐑 保留所有权利。</p>
        </div>
      </div>
      <div className="bg-gray-700 text-white text-center p-4 w-full">
        &copy; 2024 咩咩咩🐑. All rights reserved.
      </div>
    </footer>
  );
};

const MyApp = () => (
  <DarkModeProvider>
    <div className="flex flex-col min-h-screen">
      <MyHeader />
      <div className="p-60 flex-grow flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Welcome to my SHIT!😄</h1>
        <MyButton onClick={() => alert('嗨嗨嗨!')} />
        <MainContent />
      </div> 
      
      <Footer />
    </div>

  </DarkModeProvider>
);

export default MyApp;
