import React from "react";
import './index.css';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">联系信息</h2>
            <a href="mailto:8888888888@gmail.com" className="hover:underline hover:text-cyan-300">Email: 8888888888@gmail.com</a>
            <p>电话: +86 66666666666</p>
            <div className="mt-4">
              <a href="#" className="mr-4 hover:underline hover:text-cyan-300">YouTube</a>
              <a href="#" className="mr-4 hover:underline hover:text-cyan-300">Twitter</a>
              <a href="https://github.com/Ouweiming" className="mr-4 hover:underline hover:text-cyan-300">GitHub</a>
            </div>
          </div>

          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">导航</h2>
            <ul>
              <li className="my-1"><a href="#projects" className="hover:underline  hover:text-cyan-300">项目</a></li>
              <li className="my-1"><a href="#blog" className="hover:underline  hover:text-cyan-300">博客</a></li>
              <li className="my-1"><a href="#contact" className="hover:underline  hover:text-cyan-300">联系</a></li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">订阅</h2>
            <form>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="您的电子邮件"
                className="w-full p-2 rounded-md mb-4 text-black"
                autoComplete="email"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>© 2024 咩🐑. All Rights Reserved.</p>
          <p className="text-large">Made with ☕ and 💖</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 bg-gray-700 hover:bg-gray-800  hover:text-cyan-300 text-white font-bold py-2 px-4 rounded-md"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
