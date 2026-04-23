async function loadRecentWorks() {
  try {
    const response = await fetch('recent.json');
    const data = await response.json();
    const track = document.getElementById('carouselTrack');

    track.innerHTML = '';

    data.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.innerHTML = `
        <img src="images/${item.image}" alt="${item.title}">
        <div class="carousel-info">
          <h3>${item.title}</h3>
        </div>
      `;
      track.appendChild(card);
    });

    setupCarousel(track);
  } catch (error) {
    console.error('Failed to load recent works:', error);
  }
}

function setupCarousel(track) {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -340, behavior: 'smooth' });
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 340, behavior: 'smooth' });
      resetAutoSlide();
    });
  }

  let autoSlide = null;

  function startAutoSlide() {
    if (window.innerWidth <= 700) return;
    autoSlide = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const nearEnd = track.scrollLeft >= maxScroll - 10;

      if (nearEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

function getStatIcon(label) {
  const text = label.toLowerCase();

  if (text.includes('projects')) return '🧩';
  if (text.includes('customers served')) return '🤝';
  if (text.includes('students')) return '🎓';
  if (text.includes('other customer')) return '🏠';
  if (text.includes('workshops')) return '🎤';
  if (text.includes('years')) return '⏳';

  return '📊';
}

async function loadStats() {
  try {
    const response = await fetch('stats.json');
    const data = await response.json();
    const grid = document.getElementById('statsGrid');

    grid.innerHTML = '';

    data.stats.forEach((stat) => {
      const card = document.createElement('div');
      card.className = 'stat-card card gold-card reveal';
      card.innerHTML = `
        <div class="stat-icon">${getStatIcon(stat.label)}</div>
        <div class="num" data-target="${stat.value}">0</div>
        <div class="label">${stat.label}</div>
      `;
      grid.appendChild(card);
    });

    applyRevealObserver();
    animateCounters();
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.num[data-target]');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1500;
      const startTime = performance.now();

      function updateCount(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCount);
      observer.unobserve(counter);
    });
  }, { threshold: 0.55 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function applyRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((item, index) => {
    if (item.classList.contains('stagger')) {
      item.style.setProperty('--delay', `${(index % 4) * 0.08}s`);
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.14
  });

  reveals.forEach(item => revealObserver.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  applyRevealObserver();
  loadRecentWorks();
  loadStats();
});
