// console.log("hello brother");
const input = document.querySelector(".search");
console.log(input);

const getData = (e) => {
  console.log("get data", e);
};
// document.querySelector("input")
input.addEventListener("keyup", (e) => {
  let msg = e.target.value;
  getData(msg);
});
