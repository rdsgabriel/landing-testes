import Jwt from "./[jwt]";
import { Suspense } from "react";
import Workspace from "./home-page";
export default function Home() {

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Workspace>
        <Jwt />
      </Workspace>
    </Suspense>
  );
}
