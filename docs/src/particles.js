import vec2 from './vec2.js';
import { canvas, ctx  } from './canva.js';

class Particle {
    constructor(pos = vec2(), vel = vec2(), size = vec2(1, 1), color, livetime = 1) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.color = color;
        this.alpha = 1;
        this.livetime = livetime*60;
    }

    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.restore();
    }
    update() {
        this.pos = this.pos.add(this.vel);
        this.alpha -= 1 / this.livetime;
        if (this.alpha <= 0) {
            this.alpha = 0;
        }
    }
    checkALive() {
        if (this.alpha <= 0) {
            return false;
        }
        return true;
    }
}

const particles = [];

function addParticle(pos, vel, size, color, livetime) {
    particles.push(new Particle(pos, vel, size, color, livetime));
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (!particles[i].checkALive()) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    for (const particle of particles) {
        particle.draw();
    }
}




export { particles, addParticle, updateParticles, drawParticles };