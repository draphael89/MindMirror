export function initViewportLogger() {
  function updateViewportWidth() {
    document.body.setAttribute('data-width', window.innerWidth.toString());
    console.log('Viewport width:', window.innerWidth);
  }
  window.addEventListener('resize', updateViewportWidth);
  updateViewportWidth();
}