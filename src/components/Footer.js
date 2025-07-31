import React from "react";
import { apiVersion } from "../utils";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "#f8f9fa", 
        borderTop: "1px solid #dee2e6",
      }}
    >
      Application Version: {apiVersion}
    </div>
  );
};

export default Footer;
