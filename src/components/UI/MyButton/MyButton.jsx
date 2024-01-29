import React from "react";

const MyButton = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 16,
        background: "#1E6F9F",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          color: "#F2F2F2",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "700",
          lineHeight: 19.6,
          wordWrap: "break-word",
        }}
      >
        Criar
      </div>
      <div style={{ width: 16, height: 16, position: "relative" }}>
        <div
          style={{
            width: 15.97,
            height: 15.97,
            left: 0.03,
            top: -0,
            position: "absolute",
          }}
        >
          <div
            style={{
              width: 13.56,
              height: 13.56,
              left: 1.19,
              top: 1.22,
              position: "absolute",
            }}
          ></div>
          <div
            style={{
              width: 15.97,
              height: 15.97,
              left: 0,
              top: 0,
              position: "absolute",
              background: "#F2F2F2",
            }}
          ></div>
          <div
            style={{
              width: 7.51,
              height: 7.5,
              left: 4.17,
              top: 4.17,
              position: "absolute",
              background: "#F2F2F2",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MyButton;
