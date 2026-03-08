import { useState } from "react";
import GMATMock from "./gmat.jsx";
import GREMock from "./gre.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("gmat");

  const tabs = [
    { id: "gmat", label: "GMAT Focus Edition", color: "#5b6ef5" },
    { id: "gre",  label: "GRE General Test",   color: "#14b8a6" },
  ];

  return (
    <div style={{ background: "#0d0f1a", minHeight: "100vh" }}>
      {/* Tab Bar */}
      <div style={{ background: "#07090f", borderBottom: "1px solid #1e2540", display: "flex", padding: "0 32px", gap: 4 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
              color: activeTab === tab.id ? tab.color : "#4a5580",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.6px",
              padding: "13px 22px",
              transition: "color .15s, border-color .15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels — kept mounted to preserve exam state if user switches tabs */}
      <div style={{ display: activeTab === "gmat" ? "block" : "none" }}>
        <GMATMock />
      </div>
      <div style={{ display: activeTab === "gre" ? "block" : "none" }}>
        <GREMock />
      </div>
    </div>
  );
}
