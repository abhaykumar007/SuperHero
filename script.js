const input = document.getElementById("search");
const result = document.getElementById("cardID");
var id;
var search;
var favList = [];

result.innerHTML = "";
// https://abhaykumar007.github.io/SuperHero/
// token :- 1699068923618895
// "https://cors-anywhere.herokuapp.com/superheroapi.com/api/1699068923618895/search/name/";
// "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"

async function getData() {
  const inputVal = input.value;
  const url = `https://www.superheroapi.com/api.php/1699068923618895/search/${inputVal}`;
  let response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  const newData = data.results;
  // console.log(newData);
  result.innerHTML = "";
  if (inputVal.length !== 0) {
    newData.map((element, i) => {
      id = element.id;
      result.innerHTML += `<ul class="result">
              <li class="card">
              <img src="${element.image.url}" alt="" />
              <div class="card-content">
                <h2>${element.name}</h2>
                <button onclick="javascript : handelSearch(${id});" class="search-btn">Search</button>
                <button onclick="javascript : handelFav(${id});" class="add-to-favourites">Add to Favourites</button>
              </div>
            </li>
          </ul>`;
    });
  }
}
async function handelSearch(id) {
  console.log(id);
  const url = `https://superheroapi.com/api.php/1699068923618895/${id}`;
  let response = await fetch(url);
  const data = await response.json();
  localStorage.setItem("search", JSON.stringify(data));
  input.value = "";
  location.href = "./details.html";
}
async function handelFav(id) {
  console.log(id);
  const url = `https://superheroapi.com/api.php/1699068923618895/${id}`;
  let response = await fetch(url);
  const data = await response.json();
  favList.push(data);
  localStorage.setItem("favList", JSON.stringify(favList));
}
function setFavList() {
  const ref = JSON.parse(localStorage.favList);
  console.log(ref);
  ref.map((element) => {
    favList.indexOf(element) === -1
      ? favList.push(element)
      : console.log("exist");
  });
}

function debounced(func, delay) {
  let timer;
  const debouncedFunction = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData();
    }, delay);
  };
  return debouncedFunction;
}
input.addEventListener("input", debounced(getData, 500));
