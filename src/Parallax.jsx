import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './index.css';
import hill1 from './assets/hill1.png';
import hill2 from './assets/hill2.png';
import hill3 from './assets/hill3.png';
import hill4 from './assets/hill4.png';
import hill5 from './assets/hill5.png';
import leaf from  './assets/leaf.png';
import plant from './assets/plant.png';


const Parallax = () => {
  const [{ scrollY }, api] = useSpring(() => ({ scrollY: 0 }));

  const handleScroll = () => {
    api.start({ scrollY: window.scrollY });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="relative h-screen flex justify-center items-center overflow-hidden">
        <animated.img 
          style={{
            transform: scrollY.to(y => `translateY(${y * 0.5}px)`)
          }} 
          src={hill1}
          alt="Hill1" 
          className="absolute w-full top-0 left-0 pointer-events-none" 
        />
        
        <img 
          src={hill2}
          alt="Hill2" 
          className="top-0 left-0 w-full absolute pointer-events-none" 
        />
        
       
        <animated.h2 
          style={{
            transform: scrollY.to(y => `translateY(${y * 0.5}px)`)
          }} 
          className="absolute text-5xl text-white font-bold"
        >
          Welcome to my website!💕
        </animated.h2>
      
        
        <img 
          src={hill3}
          alt="Hill3" 
          className="top-0 left-0 w-full absolute pointer-events-none" 
        />
       
        <animated.img 
          style={{
            transform: scrollY.to(y => `translateX(${y * -1.5}px)`)
          }} 
          src={hill4}
          alt="Hill4" 
          className="top-0 left-0 w-full absolute pointer-events-none" 
        />
        
        <animated.img 
          style={{
            transform: scrollY.to(y => `translateY(${y * 1.5}px)`)
          }} 
          src={hill5}
          alt="Hill5" 
          className="absolute w-full top-0 left-0 pointer-events-none" 
        />
       
        <animated.img 
          style={{
            transform: scrollY.to(y => `translateY(${y * 0.5}px)`)
          }} 
          src={plant}
          alt="plant" 
          className="absolute w-full top-0 left-0 pointer-events-none" 
        />
        
        <animated.img 
          style={{
            transform: scrollY.to(y => `translateY(${y * -1.5}px) translateX(${y * 1.5}px)`)
          }} 
          src={leaf}
          alt="leaf" 
          className="absolute w-full top-0 left-0 pointer-events-none" 
        />
      </section>

      <section className="relative bg-green-900 p-24 text-white">
        <h2 className="text-3xl mb-4">Parallax Scrolling Website</h2>
        <p className="text-sm font-light">
          This is an example of a parallax scrolling effect using React and react-spring.
        </p>
      </section>
    </>
  );
};

export default Parallax;
