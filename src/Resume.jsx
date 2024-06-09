import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import EChartsReact from 'echarts-for-react';
import { motion } from "framer-motion";
import profilePhoto from './assets/mouse.jpg';
import Header from './header';
import Footer from './footer';
import { FloatButton } from 'antd';
import { useTheme } from './theme-provider'; // 假设你的主题提供程序提供了 useTheme 钩子
import 'highlight.js/styles/github.css'; // 导入高亮样式
import './index.css';

const markdown = `
---
# 个人简历

## 基本信息
- **出生日期：** 1999年9月9日
- **联系电话：** +86 66666666666
- **电子邮件：** 8888888888@gmail.com
- **居住地址：** 广东省江门市鹤山市

## 教育背景
- **本科**: 汕头大学, 数据科学与大数据技术, 2022 - 至今
- **研究生**: ~~~

  ## 技能与专长
- **编程语言：** C、Java、JavaScript、R、 Go（计划学：））
- **前端开发：** HTML、TailwindCSS、React
- **后端开发（计划学）：** Spring Boot、Node.js
- **数据库：** MySQL
---
## 技术水平:
`;

const skills = [
  { name: 'C', level: 10 },
  { name: 'Javascript', level: 10 },
  { name: 'Java', level: 10 },
  { name: 'R', level: 10 },
  { name: 'Python', level: 10 },
  { name: 'Go', level: 10 },
];

const Resume = () => {
  const { theme } = useTheme(); // 获取当前主题状态

  const getSkillsOption = () => ({
    title: {
      text: '“六边形战神\ud83d\ude48”',
      textStyle: {
        fontSize: 18,
        color: '#0080ff',
        fontWeight: 'bold',
      },
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: ['技能水平'],
      top: 'bottom',
      textStyle: {
        fontSize: 14,
        color: theme === 'dark' ? '#ccc' : '#666',
      },
    },
    radar: {
      indicator: skills.map(skill => ({ name: skill.name, max: 100 })),
      radius: '65%',
      center: ['50%', '50%'],
      axisName: { // 将 name 改为 axisName
        textStyle: {
          color: theme === 'dark' ? '#ccc' : '#666',
        },
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        },
      },
      splitArea: {
        areaStyle: {
          color: theme === 'dark' ? ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'] : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    series: [{
      type: 'radar',
      data: [{
        value: skills.map(skill => skill.level),
        name: '技能水平',
        areaStyle: {
          color: 'rgba(0, 128, 255, 0.3)',
        },
        lineStyle: {
          color: '#0080ff',
        },
        itemStyle: {
          color: '#0080ff',
        },
      }]
    }]
  });
  

  return (
    <>
    <FloatButton.BackTop/>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
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
              <br />
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              求职意向: 全栈工程师 （前端🥬🐦&&后端还没怎么学🐢）
              </p>
            </div>
          </header>
          <section className={`mb-8 prose ${theme === 'dark' ? 'prose-dark' : ''}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown}</ReactMarkdown>
          </section>
          <section>
            <EChartsReact option={getSkillsOption()} style={{ height: '400px', width: '100%' }} />
          </section>
        </div>
        <Footer />
      </motion.div>
    </>
  );
};

export default Resume;
