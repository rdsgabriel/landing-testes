import Jwt from "./[jwt]";
import { Suspense } from "react";
import SideBar from "./side-bar";
export default function Home() {

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SideBar>
        <Jwt />
      </SideBar>
    </Suspense>
  );
}
