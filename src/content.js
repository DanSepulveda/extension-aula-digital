const sections = [
  'General',
  'Aula Sincrónica',
  'Orientación al perfil y metodología del curso/ELE071067098636',
  'Fundamentos de desarrollo Front-End/ELE071067098637',
  'Fundamentos de programación en Python/ELE071067098638',
  'Programación avanzada en Python/ELE071067098639',
  'Fundamentos de bases de datos relacionales/ELE071067098640',
  'Desarrollo de aplicaciones web con Python Django/ELE071067098641',
  'Acceso a datos en aplicaciones Python Django/ELE071067098642',
  'Desarrollo de portafolio de un producto digital/ELE071067098643',
  'Desarrollo de empleabilidad en la industria digital/ELE071067098644',
];

let originalTitles = [];
const coursePage = Boolean(document.querySelector('.course-content'));

if (coursePage) {
  originalTitles = sections.map((_, index) => {
    const id = `section-${index}`;
    const el = document.getElementById(id);
    const link = el.querySelector('h3 a');
    return link.textContent;
  });
}

const apply = () => {
  chrome.storage.sync.get(null, (config) => {
    const fixTitles = config['fix'] ?? true;

    sections.forEach((section, index) => {
      const id = `section-${index}`;
      const el = document.getElementById(id);
      if (!el) return;

      const link = el.querySelector('h3 a');

      fixTitles
        ? (link.textContent = section)
        : (link.textContent = originalTitles[index]);

      const visible = config[id] ?? true;
      el.style.display = visible ? '' : 'none';
    });
  });
};

apply();

chrome.storage.onChanged.addListener(apply);
