let divShowUsers = 0;

let spanCountMan = 0;
let spanCountWoman = 0;
let spanSumAge = 0;
let spanAvgAge = 0;

let spanCountUser = 0;
let allUsers = [];
let newAllUsers = [];

let btnSearch = null;
let inputSearch = null;

window.addEventListener('load', () => {
  mapDom();
  fetchPeople();
  //handleTyping();
  inputSearch.addEventListener('keyup', searchByName);
});

const mapDom = () => {
  // Mapear o DOM
  // Contador de usuários do primeiro card
  spanCountUser = document.querySelector('#spanCountUser');
  // Exibição de todos usuários
  divShowUsers = document.querySelector('#divShowUsers');
  // Exibição das Estatísticas
  // Quantidade de homens
  spanCountMan = document.querySelector('#spanCountMan');
  // Quantidade de mulheres
  spanCountWoman = document.querySelector('#spanCountWoman');
  // Soma das idades
  spanSumAge = document.querySelector('#spanSumAge');
  // Média das idades
  spanAvgAge = document.querySelector('#spanAvgAge');
  // Botão de pesquisar
  btnSearch = document.querySelector('#btnSearch');
  // Caixa de texto de pesquisa
  inputSearch = document.querySelector('#inputSearch');
};

const fetchPeople = async () => {
  // Busca na api os dados e faz um map dos campos que vai usar
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const obj = await res.json();
  allUsers = obj.results.map((people) => {
    const { name, picture, dob, gender } = people;
    return {
      name: name.first + ' ' + name.last,
      urlImage: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  newAllUsers = allUsers;
  render(); // se nao carregar ele nao tras nada
};

const render = () => {
  // Ordena os nomes
  newAllUsers = newAllUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  // Renderiza os itens na tela
  let peopleHTML = '<div>';

  newAllUsers.forEach((people) => {
    const { name, urlImage, age } = people;

    const divHTML = `
    <div id="users-list-grid">
      <div>
        <img src="${urlImage}" alt="${name}" class="add"/>
      </div>
      <div>
        <ul>
            <li>${name}, ${age}</li>
        </ul>
      </div>
    </div>
    `;

    peopleHTML += divHTML;
  });

  peopleHTML += '</div>';
  divShowUsers.innerHTML = peopleHTML;

  refreshStatisticsAndUsers();
};

/*
function handleTyping() {
  //Evento de digitação, keyUp quando solta a tecla
  if (event.key === 'Enter') {
    searchByName();
  }
  render();
  inputSearch.addEventListener('keyup', handleTyping);
  inputSearch.focus();
  Vai buscando a medida que digita
}*/

const searchByName = () => {
  // Função que busca os usuários pelo nome.
  let filtered = inputSearch.value;
  newAllUsers = allUsers.filter((people) =>
    people.name.toLowerCase().includes(filtered.toLowerCase())
  );
  // allUsers = allUsers.filter((people) => people.name.indexOf(filtered) > -1);
  render();
};

const refreshStatisticsAndUsers = () => {
  // Variável que recebe o tamanho do array de todos usuarios (filtrados ou não)
  const qttUsersShow = newAllUsers.length;
  // Exibe no campo mapeado na DOM
  spanCountUser.innerHTML = qttUsersShow;

  // Cálculo da soma e exibição na DOM
  const sumAge = newAllUsers.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);

  spanSumAge.innerHTML = sumAge;

  // Cálculo da média e exibição na DOM
  const avgAge = sumAge / newAllUsers.length;
  spanAvgAge.innerHTML = avgAge.toFixed(2);

  // Exibir usuários Masculinos
  const userMan = newAllUsers.filter((user) => user.gender === 'male');
  spanCountMan.innerHTML = userMan.length;

  // Exibir usuários Femininos
  const userWoman = newAllUsers.filter((user) => user.gender === 'female');
  spanCountWoman.innerHTML = userWoman.length;
};

const clear = () => {
  //divUsuariosEncontrados.empty();
  //TotalUsuariosEncontrados.innerHTML = 0;
  spanCountMan.html(0);
  spanCountWoman.html(0);
  spanSumAge.html(0);
  spanAvgAge.html(0);
};
