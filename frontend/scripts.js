const API_URL = 'https://estacionamentosn-9yqova0c5-larissas-projects-0ec17445.vercel.app';

// ---------------- Veículos ----------------
document.getElementById('btn-listar-veiculos').addEventListener('click', async () => {
  const res = await fetch(`${API_URL}/veiculos`);
  const veiculos = await res.json();
  const lista = document.getElementById('lista-veiculos');
  lista.innerHTML = '';
  veiculos.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.placa} - ${v.proprietario} (${v.marca} ${v.modelo})`;
    lista.appendChild(li);
  });
});

document.getElementById('form-veiculo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch(`${API_URL}/veiculos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('Veículo adicionado com sucesso!');
    e.target.reset();
  } else {
    const error = await res.json();
    alert('Erro: ' + error.erro);
  }
});

// ---------------- Estadias ----------------
document.getElementById('btn-listar-estadias').addEventListener('click', async () => {
  const res = await fetch(`${API_URL}/estadias`);
  const estadias = await res.json();
  const lista = document.getElementById('lista-estadias');
  lista.innerHTML = '';
  estadias.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.placa} - Entrada: ${new Date(e.entrada).toLocaleString()} - Saída: ${e.saida ? new Date(e.saida).toLocaleString() : 'Em andamento'}`;
    lista.appendChild(li);
  });
});

document.getElementById('form-estadia').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.valorHora = parseFloat(data.valorHora);
  const res = await fetch(`${API_URL}/estadias`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('Estadia adicionada com sucesso!');
    e.target.reset();
  } else {
    const error = await res.json();
    alert('Erro: ' + error.erro);
  }
});
