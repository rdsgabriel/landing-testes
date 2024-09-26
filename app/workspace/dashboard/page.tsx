import Dashboard from './home-page'
import Workspace from '../home-page';
import { Suspense } from 'react';
export default function Home() {
  return (

    <Suspense fallback={<div>Carregando...</div>}>
          <Workspace>
          <Dashboard/>
        </Workspace>
    </Suspense>
   
  );
}
