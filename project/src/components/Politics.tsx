import React from "react";

export default function VaarthaPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        src="https://epaper.vaartha.com/view/3221/vaartha"
        title="Vaartha E Paper"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          display: "block",
          margin: 0,
          padding: 0,
        }}
      ></iframe>
    </div>
  );
}
