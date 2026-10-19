// Keep navigation visible if JavaScript is unavailable.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileScreen = window.matchMedia('(max-width: 650px)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.add('is-collapsed');
}

function updateMenu() {
  menuButton.hidden = !mobileScreen.matches;
  if (mobileScreen.matches) {
    closeMenu();
  } else {
    navigation.classList.remove('is-collapsed');
  }
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-collapsed', isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobileScreen.matches) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileScreen.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

mobileScreen.addEventListener('change', updateMenu);
updateMenu();
document.querySelector('#year').textContent = new Date().getFullYear();
