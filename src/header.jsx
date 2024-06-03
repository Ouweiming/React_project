import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import reactIcon from './assets/react.svg';
import { animated, useSpring } from "@react-spring/web";
import { useLocation } from "react-router-dom";
import './index.css';

export default function Header() {
  const location = useLocation();

  // React Spring animation for rotating the icon
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
        <NavbarItem isActive={location.pathname === '/Introduction'}>
          <Link href="/Introduction" aria-current="page">
            <div className="hover:text-green-600">
              Personal Introduction
            </div>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/Resume'}>
          <Link href="/Resume">
            <div className="hover:text-green-600">
              Personal Resume
            </div>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/Homepage" variant="ghost">
            Home🏠
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
