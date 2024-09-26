import TasksPage from './tasks'
import Workspace from '../home-page';
import { Suspense } from 'react';
export default function Home() {
  return (

    <Suspense fallback={<div>Carregando...</div>}>
      <Workspace>
          <TasksPage/>
        </Workspace>
    </Suspense>
    
  );
}
