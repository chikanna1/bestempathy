import dynamic from "next/dynamic";
import React from "react";
import { ContactForm } from "./ContactForm";

const DockComponent = dynamic(() =>
  import("react-dock").then((mod) => mod.Dock)
);

export default function MessageDockMobile({ children, messageDockOpen }) {
  return (
    <div>
      {typeof window !== "undefined" && (
        <DockComponent
          position="top"
          isVisible={messageDockOpen}
          size={0.95}
          dockStyle={{
            overflowY: "hidden",
            overflow: "hidden",
            overflowAnchor: "none",
          }}
        >
          {children}
        </DockComponent>
      )}
    </div>
  );
}
