const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
  mobileMenu?.classList.add('show');
  document.body.classList.add('no-scroll');
}
function closeMenu() {
  mobileMenu?.classList.remove('show');
  document.body.classList.remove('no-scroll');
}
// ESCで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
// 背景クリックで閉じる
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});