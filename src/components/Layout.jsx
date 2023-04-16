import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Main } from '../components/Main';

export function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
