const input = document.getElementById("search");
const result = document.getElementById("cardID");
const popUp = document.getElementById("pop-up");
// console.log(popUp);
var id;
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
  // console.log(id);
  const url = `https://superheroapi.com/api.php/1699068923618895/${id}`;
  let response = await fetch(url);
  const data = await response.json();
  localStorage.setItem("search", JSON.stringify(data));
  input.value = "";
  location.href = "./details.html";
}
async function handelFav(id) {
  const url = `https://superheroapi.com/api.php/1699068923618895/${id}`;
  let response = await fetch(url);
  const data = await response.json();
  console.log(data);
  var ref = JSON.parse(localStorage.getItem("favList"));
  let flag = true;
  if (ref != null) {
    ref.forEach((element) => {
      if (element.id == data.id) {
        flag = false;
        popUp.classList.add("error");
        popUp.innerText = `${data.name} is already added in list`;
        setTimeout(() => {
          popUp.classList.remove("error");
        }, 2000);
        // alert(`${data.name} is Already added in list`);
      }
    });
    if (flag) {
      let favList = [];
      favList = [...ref, data];
      localStorage.setItem("favList", JSON.stringify(favList));
      popShow(data.name);
      // alert(`${data.name} is Successfully added in list`);
    }
  }
  if (ref == null || ref == undefined) {
    let list = [data];
    localStorage.setItem("favList", JSON.stringify(list));
    popShow(data.name);
    // alert(`${data.name} is Successfully added in list`);
  }
}
function popShow(name) {
  console.log(name);
  popUp.classList.add("success");
  popUp.innerText = `${name} is Successfully added in list`;
  setTimeout(() => {
    popUp.classList.remove("success");
  }, 2000);
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
