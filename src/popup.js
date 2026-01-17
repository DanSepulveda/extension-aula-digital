const sections = [
  'General',
  'Aula Sincrónica',
  'M1: Orientación y metodología',
  'M2: Fundamentos Front-End',
  'M3: Fundamentos Python',
  'M4: Python Avanzado',
  'M5: BBDD relacionales',
  'M6: Python Django - Web',
  'M7: Python Django - Datos',
  'M8: Portafolio digital',
  'M9: Empleabilidad',
];

const controls = document.getElementById('controls');

sections.forEach((section, index) => {
  const sectionId = `section-${index}`;

  const label = document.createElement('label');
  label.className = 'switch-row';

  const text = document.createElement('span');
  text.className = 'text';
  text.textContent = section;

  const switchWrapper = document.createElement('span');
  switchWrapper.className = 'switch';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.section = sectionId;

  const slider = document.createElement('span');
  slider.className = 'slider';

  switchWrapper.appendChild(checkbox);
  switchWrapper.appendChild(slider);
  label.appendChild(text);
  label.appendChild(switchWrapper);
  controls.appendChild(label);
});

// read checkboxes status
chrome.storage.sync.get(null, (data) => {
  document.querySelectorAll('input[type=checkbox]').forEach((cb) => {
    const defaultValue = ['fix-titles', 'reload-page'].includes(cb.id);
    cb.checked = data[cb.dataset.section] ?? !defaultValue;
  });
});

// update checkboxes status
const container = document.getElementById('container');
container.addEventListener('change', (e) => {
  if (e.target.type !== 'checkbox') return;

  const section = e.target.dataset.section;
  chrome.storage.sync.set({
    [section]: e.target.checked,
  });
});
