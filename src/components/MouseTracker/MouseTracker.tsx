// import React, { useEffect, useState } from "react";

// const MouseTracker = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const { clientX, clientY } = event;
//       setMousePosition({ x: clientX, y: clientY });
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const { x, y } = mousePosition;

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Render your content here */}
//       <div
//         style={{
//           position: "absolute",
//           top: y - 10, // Adjust the position to center the border around the mouse
//           left: x - 10,
//           border: "2px solid red",
//           width: "20px",
//           height: "20px",
//           borderRadius: "50%",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default MouseTracker;

// import React, { useEffect, useState } from "react";

// interface MousePosition {
//   x: number;
//   y: number;
// }

// const MouseTracker: React.FC = () => {
//   const [mousePosition, setMousePosition] = useState<MousePosition>({
//     x: 0,
//     y: 0,
//   });

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       const { clientX, clientY } = event;
//       setMousePosition({ x: clientX, y: clientY });
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const { x, y } = mousePosition;

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Render your content here */}
//       <div
//         style={{
//           position: "absolute",
//           top: y - 10, // Adjust the position to center the border around the mouse
//           left: x - 10,
//           border: "2px solid red",
//           width: "20px",
//           height: "20px",
//           borderRadius: "50%",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default MouseTracker;

// import React, { useEffect, useState } from "react";

// interface MousePosition {
//   x: number;
//   y: number;
// }

// const MouseTracker: React.FC = () => {
//   const [mousePosition, setMousePosition] = useState<MousePosition>({
//     x: 0,
//     y: 0,
//   });

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       const { clientX, clientY } = event;
//       setMousePosition({ x: clientX, y: clientY });
//     };

//     const handleScroll = () => {
//       const { pageXOffset, pageYOffset } = window;
//       setMousePosition((prevPosition) => ({
//         ...prevPosition,
//         x: prevPosition.x + (pageXOffset - prevPosition.x),
//         y: prevPosition.y + (pageYOffset - prevPosition.y),
//       }));
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const { x, y } = mousePosition;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         pointerEvents: "none",
//         zIndex: 9999,
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: y - 10,
//           left: x - 10,
//           border: "2px solid red",
//           width: "20px",
//           height: "20px",
//           borderRadius: "50%",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default MouseTracker;

import React, { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMouseClicked, setIsMouseClicked] = useState(false);
  const [color, setColor] = useState("red");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    const handleMouseDown = () => {
      setIsMouseClicked(true);
    };

    const handleMouseUp = () => {
      setIsMouseClicked(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const { x, y } = mousePosition;

  const trackerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    // backgroundColor: isMouseClicked ? "blue" : "red",
    backgroundColor: color,
  };

  return (
    <div
      // style={trackerStyle}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    >
      <div
        className={`relative flex items-center bg-gradient-to justify-center grad w-16 h-16 rounded-full  ${
          isMouseClicked ? "animate-" : "animate-"
        }`}
        style={{
          top: y - 10,
          left: x - 10,
        }}
      >
        {/* <div
          className={`absolute flex items-center justify-center bg-primary w-8 h-8 rounded-full  ${
            isMouseClicked ? "animate-" : "animate-"
          }`}
        >
          <div
            className={`absolute grad flex items-center justify-center bg-primary w-12 h-12 rounded-full  ${
              isMouseClicked ? "animate-" : "animate-"
            }`}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default MouseTracker;
