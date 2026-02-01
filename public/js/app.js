async function loadCounter() {
  const res = await fetch('/api/counter');
  const data = await res.json();
  document.getElementById('counter').innerText = `Counter: ${data.counter}`;
}

document.getElementById('increment-counter-btn').addEventListener('click', async () => {
  await fetch('/api/counter/increment', { method: 'POST' });
  loadCounter();
});


document.getElementById('reset-counter-btn').addEventListener('click', async () => {
  await fetch('/api/counter/reset', { method : 'PATCH'});
  loadCounter();
});


document.getElementById('toggleBtn').addEventListener('click', async () => {

  const response = await fetch('/api/counter/toggle', { method: 'POST'});
  const data = await response.json();

  let enabled = data.enabled;

  document.getElementById('toggleBtn').textContent = enabled ? 'Disable Counter' : 'Enable Counter';
  document.getElementById('increment-counter-btn').disabled = !enabled;
  document.getElementById('reset-counter-btn').disabled = !enabled;


})



loadCounter();