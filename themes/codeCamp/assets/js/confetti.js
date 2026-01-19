// Confetti Animation - Banner contained
(function() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const banner = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let isRunning = false;

  // Configuration
  const colors = ['#0077b6', '#00b4d8', '#90e0ef', '#f72585', '#7209b7', '#3a0ca3', '#4cc9f0', '#ffd166', '#06d6a0'];
  const particleCount = 80;
  const gravity = 0.15;
  const drag = 0.02;
  const terminalVelocity = 3;
  const spin = 0.1;

  function resizeCanvas() {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
  }

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.velocity = {
        x: randomRange(3, 8) * direction,
        y: randomRange(-4, -1)
      };
      this.size = randomRange(4, 8);
      this.rotation = randomRange(0, Math.PI * 2);
      this.rotationSpeed = randomRange(-spin, spin);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
      this.opacity = 1;
    }

    update() {
      // Apply gravity
      this.velocity.y += gravity;

      // Apply drag
      this.velocity.x *= (1 - drag);
      this.velocity.y = Math.min(this.velocity.y, terminalVelocity);

      // Update position
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Update rotation
      this.rotation += this.rotationSpeed;

      // Fade out when near edges
      if (this.y > canvas.height - 10 || this.x < 10 || this.x > canvas.width - 10) {
        this.opacity -= 0.05;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    isAlive() {
      return this.opacity > 0 && this.y < canvas.height + 20 && this.x > -20 && this.x < canvas.width + 20;
    }
  }

  function createParticles() {
    const midY = canvas.height / 2;
    // Spray from left side
    for (let i = 0; i < particleCount / 2; i++) {
      particles.push(new Particle(0, midY + randomRange(-10, 10), 1));
    }
    // Spray from right side
    for (let i = 0; i < particleCount / 2; i++) {
      particles.push(new Particle(canvas.width, midY + randomRange(-10, 10), -1));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.isAlive());

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animate);
    } else {
      isRunning = false;
    }
  }

  function startConfetti() {
    if (isRunning) return;
    isRunning = true;
    resizeCanvas();
    particles = [];
    createParticles();
    animate();
  }

  // Initialize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Start animation on load
  startConfetti();

  // Allow re-triggering by clicking the banner
  banner.style.cursor = 'pointer';
  banner.addEventListener('click', function(e) {
    if (e.target.tagName !== 'A') {
      startConfetti();
    }
  });
})();
