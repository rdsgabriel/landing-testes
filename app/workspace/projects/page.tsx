import Projects from './home-page';
import SideBar from '../side-bar';
import { Suspense } from 'react';
export default function Home() {
  return (

    <Suspense fallback={<div>Carregando...</div>}>
      <SideBar>
        <Projects/>
      </SideBar>
    </Suspense>

  );
}
