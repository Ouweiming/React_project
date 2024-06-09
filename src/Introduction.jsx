import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import profilePhoto from './assets/pig.png';
import { motion } from 'framer-motion';
import Header from './header';
import Footer from './footer';
import { FloatButton } from 'antd';
import { useTheme } from './theme-provider'; 

const markdown = `
---
Hello！我是咩，一只小程序猿🐒;

### 业余爱好
- **电影**：炒鸡爱看恐怖片 and 丧尸片，阅片无数：）
- **篮球**：又屎又大瘾~
- **音游**：解压新方式嘿嘿嘿~
- **修电脑**：让电脑蓝屏是我的兴趣之一。

### 超能力
- **Bug制造机**：你需要一个bug吗？只需一分钟，我能制造出你从未见过的复杂bug，绝对是天赋技能！
- **代码大胃王**：我的代码可以吃掉所有内存和CPU，不信你试试！
- **夜猫子**：白天写代码？不存在的，深夜才是我大显身手的时候！嘿嘿，舍友幸福时刻：）

### 技术栈
- **HTML**：我会写标签！<br>
- **CSS**：我会让页面的按钮跳舞！<br>
- **JavaScript**：我能让浏览器崩溃，亲测有效！

### 前端开发技能
- **React**：我知道它的存在！
- **Vue**：我听说它很流行！还有很多糖吃🤫;
- **Angular**：好像是个框架吧?

### 未来计划
- 继续写代码，直到自己变成代码。
- 发明一种能自动修复bug的机器，拯救所有被bug困扰的灵魂。

如果你对我感兴趣，想要了解更多关于我的奇葩故事，欢迎随时联系我！但请确保你的设备已经备份，因为谁知道会发生什么呢？：）

---
`;

const Introduction = () => {
  const { theme } = useTheme(); // 获取当前主题状态

  return (
    <>
      <FloatButton.BackTop/>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 1.6 }}
      >
        <Header />
        <div className={`container mx-auto p-4 ${theme === 'dark' ? 'dark' : ''}`}>
          <header className="flex items-center mb-8">
            <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mr-4 border-2 border-gray-300" />
            <div>
              <h1 className="text-4xl font-bold">咩</h1>
            </div>
          </header>
          <section className={`mb-8 prose ${theme === 'dark' ? 'prose-dark' : ''}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown}</ReactMarkdown>
          </section>
        </div>
        <Footer />
      </motion.div>
    </>
  );
};

export default Introduction;
