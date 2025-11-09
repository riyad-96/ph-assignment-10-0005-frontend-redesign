import React from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';

function Header() {
  const { user } = useGlobalContext();
  console.log(user);

  return <div>Header</div>;
}

export default Header;
