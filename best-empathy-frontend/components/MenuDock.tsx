import { useEffect } from "react";
import { Dock } from "react-dock";

export default function MenuDock() {
  useEffect(() => {
    MenuDockComponent();
  });
}

function MenuDockComponent() {
  return (
    <Dock position="right" isVisible={true}>
      {/* you can pass a function as a child here */}
    </Dock>
  );
}
