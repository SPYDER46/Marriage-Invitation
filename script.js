/* ─────────────────────────────────────────
   MARRIAGE INVITATION — script.js
   Handles: scroll reveal, petals, map, RSVP modal
───────────────────────────────────────── */

/* ── 1. SCROLL REVEAL ─────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.section, .venue-section, .rsvp-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ── 2. FALLING PETALS ────────────────── */
function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const colors = ['#C4738A', '#E8B4C0', '#C9A84C', '#E8C97A', '#D4A0A8'];
  const shapes = [
    'M0,5 Q3,0 6,3 Q9,6 6,9 Q3,12 0,9 Q-3,6 0,5Z',
    'M0,0 Q4,-2 5,2 Q6,6 2,7 Q-2,8 -2,4 Q-2,0 0,0Z',
    'M0,8 Q4,0 8,4 Q12,8 8,12 Q4,16 0,12 Q-4,8 0,8Z',
  ];

  for (let i = 0; i < 8; i++) {
    const svg  = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const size = 8 + Math.random() * 10;
    svg.setAttribute('width',   size);
    svg.setAttribute('height',  size);
    svg.setAttribute('viewBox', '-4 -4 18 18');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d',    shapes[Math.floor(Math.random() * shapes.length)]);
    path.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
    svg.appendChild(path);

    svg.classList.add('petal');
    const left  = Math.random() * 100;
    const dur   = 6  + Math.random() * 10;
    const delay = Math.random() * 12;
    svg.style.cssText = `left:${left}%; animation-duration:${dur}s; animation-delay:-${delay}s;`;

    container.appendChild(svg);
  }
}

/* ── 3. MAP ───────────────────────────── */
const MAP_URLS = {
  ceremony:  'https://maps.app.goo.gl/7p2BcjGasThSD5mKA',
  reception: 'https://maps.app.goo.gl/y5SEVZyEkw3k6BgCA',
};

function openMaps(venue) {
  const url = MAP_URLS[venue] || MAP_URLS.ceremony;
  window.open(url, '_blank');
}

/* ── 4. RSVP MODAL ────────────────────── */
let _accepting = true;

function openRSVP(accept) {
  _accepting = accept;

  const modal      = document.getElementById('modal');
  const title      = document.getElementById('modal-title');
  const sub        = document.getElementById('modal-sub');
  const btn        = document.getElementById('modal-btn');
  const guestInput = document.getElementById('modal-guests');

  if (accept) {
    title.textContent      = "We're Delighted!";
    sub.textContent        = 'Please share your name & guest count';
    btn.textContent        = 'Confirm Attendance ✦';
    guestInput.style.display = 'block';
  } else {
    title.textContent      = "We'll Miss You";
    sub.textContent        = 'Please let us know who you are';
    btn.textContent        = 'Send My Regrets';
    guestInput.style.display = 'none';
  }

  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('open');

  /* Reset form fields */
  const nameInput  = document.getElementById('modal-name');
  const guestInput = document.getElementById('modal-guests');
  if (nameInput)  nameInput.value  = '';
  if (guestInput) guestInput.value = '';
}

function submitRSVP() {
  const nameInput = document.getElementById('modal-name');
  const name      = nameInput ? nameInput.value.trim() : '';

  if (!name) {
    nameInput && nameInput.focus();
    return;
  }

  const modal = document.getElementById('modal');
  const card  = modal.querySelector('.modal-card');

  const message = _accepting
    ? `Dear ${name},<br>We look forward to celebrating<br>with you on our special day.`
    : `Dear ${name},<br>We understand and wish you<br>were here to share our joy.`;

  const confirmTitle = _accepting ? "See you there!" : "Thank you";

  card.innerHTML = `
    <div style="padding: 20px 0;">
      <p class="modal-confirm-title">${confirmTitle}</p>
      <p class="modal-confirm-divider">✦ ✦ ✦</p>
      <p class="modal-confirm-body">${message}</p>
      <button class="modal-confirm-btn" onclick="closeModal()">Close</button>
    </div>
  `;
}

/* Close modal when clicking the dark backdrop */
function initModalBackdropClose() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function isMobile() {
  return window.innerWidth < 768;
}

if (!isMobile()) {
  initPetals();
}

/* ── 5. INIT ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initPetals();
  initModalBackdropClose();
});
