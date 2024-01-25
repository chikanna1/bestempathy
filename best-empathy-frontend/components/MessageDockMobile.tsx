import dynamic from "next/dynamic";
import React from "react";
import { ContactForm } from "./ContactForm";

const DockComponent = dynamic(() =>
  import("react-dock").then((mod) => mod.Dock)
);

export default function MessageDockMobile({
  messageDockOpen,
  setIsMessageDockOpen,
  therapist,
}) {
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
          <div className="flex flex-col justify-center items-center">
            <div onClick={() => setIsMessageDockOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 mx-auto mb-10 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-center text-[15px]">
              Send an Email to{" "}
              <span className=" capitalize">{therapist.firstName}</span>
            </p>
            <ContactForm
              therapist_email_address={therapist.email}
              therapist_slug={therapist.slug}
              mobile={true}
              setIsMessageDockOpen={setIsMessageDockOpen}
            />
          </div>
        </DockComponent>
      )}
    </div>
  );
}
