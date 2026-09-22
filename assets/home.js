// ============================================================
// EBD Digital — Home (index.html)
// Mostra a "Apresentação da Revista" e o botão "Iniciar estudo"
// logo abaixo do carrossel de capas. O painel exibido é o da capa
// que está no centro; toque numa capa vizinha para trazê-la ao centro.
// Só é carregado pela index.html (não afeta as demais páginas).
// ============================================================
(function () {
  var carousel = document.querySelector('.app-carousel');
  if (!carousel) return;
  var cards = Array.prototype.slice.call(carousel.querySelectorAll('.app-carousel-card'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.app-pres'));
  if (!cards.length || cards.length !== panels.length) return; // sem painéis = comportamento antigo (links)

  document.documentElement.classList.add('has-pres');
  var current = -1;

  function show(i) {
    if (i === current) return;
    current = i;
    panels.forEach(function (p, k) { p.hidden = (k !== i); });
    cards.forEach(function (c, k) {
      c.classList.toggle('is-active', k === i);
      if (k === i) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
    });
  }

  // Celular: uma capa por vez no centro -> a capa central manda.
  // Telas largas (várias capas visíveis): a escolha é feita pelo toque.
  function singleView() {
    return carousel.clientWidth < cards[0].offsetWidth * 2.2;
  }

  function centerOffset(card) {
    var c = carousel.getBoundingClientRect();
    var r = card.getBoundingClientRect();
    return (r.left + r.width / 2) - (c.left + c.width / 2);
  }

  function nearestToCenter() {
    var best = 0, bestDist = Infinity;
    cards.forEach(function (card, k) {
      var d = Math.abs(centerOffset(card));
      if (d < bestDist) { bestDist = d; best = k; }
    });
    return best;
  }

  var raf = 0, lockUntil = 0; // lockUntil: evita "piscar" de painéis durante a rolagem animada de um toque
  carousel.addEventListener('scroll', function () {
    if (!singleView() || Date.now() < lockUntil) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () { show(nearestToCenter()); });
  }, { passive: true });

  cards.forEach(function (card, k) {
    card.addEventListener('click', function (e) {
      // Sem modificadores (ctrl/cmd/shift) o link antigo é substituído pelo painel abaixo.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
      e.preventDefault();
      if (k !== current) {
        show(k);
        lockUntil = Date.now() + 700;
        carousel.scrollBy({ left: centerOffset(card), behavior: 'smooth' });
      } else {
        panels[k].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('resize', function () {
    if (singleView()) show(nearestToCenter());
  });

  show(singleView() ? nearestToCenter() : 0);
})();
