import TasksPage from './tasks'
import Workspace from '../home-page';
export default function Home() {
  return (
    <Workspace>
      <TasksPage/>
    </Workspace>
  );
}
