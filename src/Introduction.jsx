import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import profilePhoto from './assets/pig.png';
import Header from './header';
import 'highlight.js/styles/github.css'; // 导入高亮样式
import Footer from './footer';
import './index.css';

const markdown = `

---

大家好！我是咩，一个被代码和咖啡拯救的程序猿&#x1F412;

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
- **Vue**：我听说它很流行！还有很多糖吃&#x1F60B;
- **Angular**：好像是个框架吧?

### 其他爱好
- **修电脑**：让电脑蓝屏是我的兴趣之一。
- **打游戏**：特别喜欢写代码的游戏，感觉自己更聪明了。
- **养猫**：跟我的代码一样，捉摸不定，但又特别可爱。

### 未来计划
- 继续写代码，直到自己变成代码。
- 发明一种能自动修复bug的机器，拯救所有被bug困扰的灵魂。

如果你对我感兴趣，想要了解更多关于我的奇葩故事，欢迎随时联系我！但请确保你的设备已经备份，因为谁知道会发生什么呢？

---

`;

const Introduction =() =>{

    return (
    <>
    <Header/>
    <div className="container mx-auto p-4">
      <header className="flex items-center mb-8">
        <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full mr-4 border-2 border-gray-300" />
        <div>
          <h1 className="text-4xl font-bold">咩</h1>
        </div>
      
      </header>
      <section className="mb-8 prose">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown}</ReactMarkdown>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Introduction;