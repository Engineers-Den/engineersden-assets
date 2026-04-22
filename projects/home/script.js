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

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -340, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 340, behavior: 'smooth' });
    });
  } catch (error) {
    console.error('Failed to load recent works:', error);
  }
}

async function loadStats() {
  try {
    const response = await fetch('stats.json');
    const data = await response.json();
    const grid = document.getElementById('statsGrid');

    grid.innerHTML = '';

    data.stats.forEach(stat => {
      const card = document.createElement('div');
      card.className = 'stat-card card';
      card.innerHTML = `
        <div class="num">${stat.value}</div>
        <div class="label">${stat.label}</div>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadRecentWorks();
  loadStats();
});
