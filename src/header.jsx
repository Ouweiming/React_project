import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import reactIcon from './assets/react.svg';
import { animated, useSpring } from '@react-spring/web';
import './index.css';
import { FaGithub } from 'react-icons/fa';
import { RiHomeHeartLine } from "react-icons/ri";

export default function Header() {

  const rotate = useSpring({
    loop: true,
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 8000 }
  });

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <div>
          <animated.img 
            src={reactIcon} 
            alt="React Icon" 
            className="mr-6 w-12 h-12"
            style={rotate} 
          />
        </div>
        <p className="font-bold text-inherit">咩🐑</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
        <NavbarItem>
          <Button as={Link} color="primary" href="/Introduction" variant="light" radius='full'>
            Personal Introduction
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button as={Link} color="primary" href="/Homepage" variant="ghost" radius="full" endContent= {<RiHomeHeartLine size={20}/>}>
            Home
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button as={Link} color="primary" href="/Resume" variant="light" radius="full">
            Personal Resume
          </Button>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent justify="end" className="flex items-center gap-2">
        <NavbarItem>
          <Button isIconOnly
            as="a" 
            href="https://github.com/Ouweiming" 
            color="primary" 
            variant="light"
            className="p-2 rounded-full " 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub size={50} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
