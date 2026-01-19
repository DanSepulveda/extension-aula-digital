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
const container = document.getElementById('container');

// ADD SWITCHES TO HIDE/SHOW MODULES
sections.forEach((section, index) => {
  const label = document.createElement('label');
  label.textContent = section;

  const switchWrapper = document.createElement('span');
  switchWrapper.className = 'switch';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.type = 'sync';
  checkbox.dataset.name = `section-${index}`;

  const slider = document.createElement('span');
  slider.className = 'slider';

  switchWrapper.appendChild(checkbox);
  switchWrapper.appendChild(slider);
  label.appendChild(switchWrapper);
  controls.appendChild(label);
});

// READ MODULES SWITCHES CHECKED VALUES
chrome.storage.sync.get(null, (data) => {
  container.querySelectorAll('[data-type="sync"]').forEach((cb) => {
    cb.checked = data[cb.dataset.name] ?? true;
  });
});

//  READ RELOAD SWITCH CHECKED VALUE
chrome.storage.local.get(['reload'], (data) => {
  container.querySelectorAll('[data-type="local"]').forEach((cb) => {
    cb.checked = Boolean(data.reload);
  });
});

// UPDATE SWITCHES CHECKED VALUES
container.addEventListener('change', (e) => {
  const cb = e.target;
  if (cb.type !== 'checkbox') return;

  const type = cb.dataset.type;

  if (type === 'sync') {
    chrome.storage.sync.set({
      [cb.dataset.name]: cb.checked,
    });
  }

  if (type === 'local') {
    chrome.storage.local.set({
      reload: cb.checked,
    });

    chrome.runtime.sendMessage({
      type: 'SET_AUTO_RELOAD',
      enabled: cb.checked,
    });
  }
});
