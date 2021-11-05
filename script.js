const input = document.getElementById("search");
const result = document.getElementById("cardID");
console.log(result);
result.innerHTML = "";
// https://abhaykumar007.github.io/SuperHero/
// token :- 1699068923618895
// "https://cors-anywhere.herokuapp.com/superheroapi.com/api/1699068923618895/search/name/";

async function getData() {
  const url =
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
  let response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  if (input.value.length == 0) {
    result.innerHTML = "";
  } else {
    var newData = data.filter(function (element) {
      return element.name.toLowerCase().includes(input.value);
    });
    console.log(newData);
    newData.map((element, i) => {
      result.innerHTML += `<ul class='result'">
            <li class ='card'>
              <img src='${element.images.md}' alt="" />
              <div class="card-content">
                <a class="content" href="">${element.name}</a>
                <a class="content" href="">${element.biography.fullName}</a>
                <a class="content" href="">Add to Favourites</a>
              </div>
            </li>
          </ul>
          <br />`;
    });
  }
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
