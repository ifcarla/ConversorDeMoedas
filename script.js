const moedas = ["USD", "BRL", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF"]; 

const moedaDe = document.getElementById("moedaDe");
const moedaPara = document.getElementById("moedaPara");
const resultado = document.getElementById("resultado");

moedas.forEach(m => {
  let option1 = new Option(m, m); 
  let option2 = new Option(m, m); 
  moedaDe.add(option1);
  moedaPara.add(option2);
});

moedaPara.value = "BRL";  

async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const de = moedaDe.value;
  const para = moedaPara.value;

  if (isNaN(valor)) {
    resultado.textContent = "Digite um valor válido.";
    return;
  }

  if (de === para) {
    resultado.textContent = "As moedas são iguais.";
    return;
  }

  try {
    const apiKey = '929e4796cad0af1d54f54310'; 
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${de}`);
    const dados = await res.json();

    if (dados.result === 'error') {
      resultado.textContent = "Erro ao acessar a API.";
      return;
    }

    const taxa = dados.conversion_rates[para];
    const convertido = valor * taxa;
    resultado.textContent = `${valor} ${de} = ${convertido.toFixed(2)} ${para} (taxa: ${taxa.toFixed(4)})`;
  } catch (error) {
    resultado.textContent = "Erro ao acessar a API.";
    console.error(error);
  }
}
