const input = document.getElementById("search");

// token :- 1699068923618895
// "https://cors-anywhere.herokuapp.com/superheroapi.com/api/1699068923618895/search/name/";

async function getData() {
  const url =
    "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
  let response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  var newData = data.filter(function (element) {
    return element.name.toLowerCase().includes(input.value);
  });
  console.log(newData);
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
