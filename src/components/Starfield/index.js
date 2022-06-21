import React, { useEffect, createRef } from "react"

const Starfield = (props) => {
  const canvasRef = createRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 600);
    const colorRange = [0, 60, 240];

    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.offsetWidth;
      const y = Math.random() * canvas.offsetHeight;
      const radius = Math.random() * 1.2;
      const hue = colorRange[getRandom(0, colorRange.length - 1)];
      const sat = getRandom(50, 100);

      context.beginPath();
      context.arc(x, y, radius, 0, 360);
      context.fillStyle = `hsl(${hue}, ${sat}%, 90%)`;
      context.fill();
    }
  });

  return (
    <canvas
      className="starfield"
      ref={canvasRef}
      {...props}
    />
  )
}

export default Starfield;
