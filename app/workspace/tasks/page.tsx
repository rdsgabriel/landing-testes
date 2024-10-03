import TasksPage from './tasks'
import SideBar from '../side-bar';
import { Suspense } from 'react';
export default function Home() {
  return (

    <Suspense fallback={<div>Carregando...</div>}>
      <SideBar>
          <TasksPage/>
        </SideBar>
    </Suspense>
  );
}
