async function loadContactData() {
  const response = await fetch('contact-data.json');
  if (!response.ok) {
    throw new Error('Could not load contact-data.json');
  }
  return response.json();
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function applyContactData(data) {
  setText('primaryPhone', data.primaryPhone);
  setText('secondaryPhone', data.secondaryPhone);
  setLink('primaryPhoneLink', `tel:${data.primaryPhone}`);
  setLink('secondaryPhoneLink', `tel:${data.secondaryPhone}`);

  setText('whatsappPhone', data.primaryPhone);
  setLink('whatsappLink', data.whatsapp);

  setText('emailValue', data.email);
  setLink('emailLink', `mailto:${data.email}`);

  setLink('facebookLink', data.facebook);

  setText('office1Name', data.office1Name);
  setText('office1Address', data.office1Address);
  setLink('office1Map', data.office1Map);

  setText('office2Name', data.office2Name);
  setText('office2Address', data.office2Address);
  setLink('office2Map', data.office2Map);

  setLink('ctaWhatsapp', data.whatsapp);
}

function applyRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', async () => {
  applyRevealObserver();

  try {
    const contactData = await loadContactData();
    applyContactData(contactData);
  } catch (error) {
    console.error(error);
  }
});
