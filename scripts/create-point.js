// (res) => {return res.jason()}    -> função anônima para vários termos
// res => res.jason()              -> função anônima para um termo ou simples

function populateUFs(){
    //Selecionando a tag select que possui o name uf
    const ufSelect = document.querySelector("select[name = uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then( states => {
        //state é uma variável que recebe cada estado do array de states
        for(const state of states){
            ufSelect.innerHTML += `<option value='${state.id}'> ${state.nome} </option> `
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name = city]")
    const stateInput = document.querySelector("[name = state]")

    //Recebe o valor da uf (id)
    ufValue = event.target.value;

    //alterar o value do input escondido na label state para o nome do estado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    //Caminho para o json do município
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`

    //Reseta o campo cidades, caso o usuário selecione uma opção de estado e mude para outra
    //o campo cidades será reiniciado
    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true


    fetch(url)
    .then( res =>  res.json() )
    .then( cities => {
        //state é uma variável que recebe cada estado do array de states
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}"> ${city.nome} </option> `
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    //Passando a função getCities por referência
    .addEventListener("change", getCities)