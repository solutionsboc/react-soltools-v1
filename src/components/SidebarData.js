import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'MM Customizer',
    path: '/MMCUSTOMIZER/mmcustomizer',
    icon: <IoIcons.IoMdCreate />,
    cName: 'nav-text'
  },
  {
    title: 'Ideas',
    path: '/ideas',
    icon: <FaIcons.FaLightbulb />,
    cName: 'nav-text'
  },
  {
    title: 'MOI',
    path: '/MOI/moi',
    icon: <FaIcons.FaSyncAlt />,
    cName: 'nav-text'
  },
  {
    title: 'API query',
    path: '/APIQUERY/apiquery',
    icon: <AiIcons.AiOutlineApi />,
    cName: 'nav-text'
  },
  /* {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  }, */
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
