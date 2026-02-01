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



loadCounter();