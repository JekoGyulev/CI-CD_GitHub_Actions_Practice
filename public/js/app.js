async function loadCounter() {
  const res = await fetch('/api/counter');
  const data = await res.json();
  document.getElementById('counter').innerText = `Counter: ${data.counter}`;
}

document.getElementById('btn').addEventListener('click', async () => {
  await fetch('/api/counter/increment', { method: 'POST' });
  loadCounter();
});

loadCounter();