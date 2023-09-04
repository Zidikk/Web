(function () {
  window.startTime = new Date().getTime();
  window.addEventListener('load', function () {
    document.getElementById('load-time').innerHTML =
      new Date().getTime() - window.startTime + 'ms + server';
  });
})();
