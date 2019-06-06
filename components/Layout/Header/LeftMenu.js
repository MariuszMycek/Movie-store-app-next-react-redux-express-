import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';

const LeftMenu = () => (
  <Menu mode='horizontal'>
    <Menu.Item key='new_movies'>
      <Link href='new-movies'>
        <a>New Movies</a>
      </Link>
    </Menu.Item>
  </Menu>
);

export default LeftMenu;
