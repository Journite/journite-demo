export const onSuccess = () => {
  const canvas = document.getElementById("canvas");
  const context = (canvas as HTMLCanvasElement)?.getContext("2d");
  const maxConfettiAmount = 80;
  const particles: ConfettiParticle[] = [];
  let W = (canvas as HTMLCanvasElement)?.width;
  let H = (canvas as HTMLCanvasElement)?.height;

  const possibleColors = [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
    "#052e16",
  ];

  function randomFromTo(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  class ConfettiParticle {
    x = Math.random() * W; // x
    y = Math.random() * H - H; // y
    r = randomFromTo(3, 8); // radius
    d = randomFromTo(1, 2);
    color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    tilt = Math.floor(Math.random()) - 11;
    tiltAngleIncremental = Math.random() * 0.02 + 0.05;
    tiltAngle = 0;

    draw() {
      if (context) {
        context.beginPath();
        context.lineWidth = this.r as number;
        context.strokeStyle = this.color as string;
        context.moveTo(
          (this.x as number) +
            (this.tilt as number) / 5 +
            (this.r as number) / 3,
          this.y as number,
        );
        context.lineTo(
          (this.x as number) + (this.tilt as number),
          (this.y as number) +
            (this.tilt as number) / 3 +
            (this.r as number) / 5,
        );
      }
      return context?.stroke();
    }
  }

  function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context?.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettiAmount; i++) {
      results.push(particles[i].draw());
    }

    let particle;
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettiAmount; i++) {
      particle = particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= H) remainingFlakes++;

      // If a confetti has fluttered out of view,
      // bring it back to above the viewport and let if re-fall.
      // if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      //   if (new Date().getTime() - startTime > 1) {
      //     particle.x = Math.random() * W;
      //     particle.y = -30;
      //     particle.tilt = Math.floor(Math.random() * 10) - 20;
      //   }
      // }
    }

    return results;
  }

  // Push new confetti objects to `particles[]`
  for (var i = 0; i < maxConfettiAmount; i++) {
    particles.push(new ConfettiParticle());
  }

  Draw();
};
