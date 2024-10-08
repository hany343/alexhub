import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './UsrData';
import { AdminData } from './AdminData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { AuthContext } from '../Contexts/AuthContext';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  let { UserData,UserIsLogedIn } = useContext(AuthContext);
  
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    
      <IconContext.Provider value={{ color: '#fff'}}>
        <Nav className=' fs-5 bg-white'>
          
          <NavIcon to='#' >
            
            <FaIcons.FaBars onClick={showSidebar} className=' text-dark shadow-lg fs-2'/>
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {
              UserData.user_type=='User'?
            SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })
            :
            AdminData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })
            }
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
