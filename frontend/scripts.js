const API_URL = 'https://https://estacionamentosn.vercel.app/'; // substitua pelo link real da sua API

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
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch(`${API_URL}/veiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
