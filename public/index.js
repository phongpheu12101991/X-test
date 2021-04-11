function validTime(Time) {
  if (
    typeof Time !== "string" ||
    Time.length !== 5 ||
    Time[2] !== ":" ||
    Number(Time[0]) < 0 ||
    Number(Time[0]) > 9 ||
    Number(Time[1]) < 0 ||
    Number(Time[1]) > 9 ||
    Number(Time[3]) < 0 ||
    Number(Time[4]) > 9 ||
    Number(Time[4]) < 0 ||
    Number(Time[0]) > 9 ||
    Number(Time.slice(0, 2)) < 0 ||
    Number(Time.slice(0, 2)) > 24 ||
    Number(Time.slice(3)) >= 60 ||
    Number(Time.slice(3)) < 0
  ) {
    return false;
  }

  return true;
}

console.log(validTime("05:56"));
console.log(validTime("25:56"));
console.log(validTime("05:60"));
console.log(validTime("b5:60"));
// b2
function MissingNumber(arr, n) {
  if (arr.length > 0 && arr.length <= 1000) {
    let arrmiss = [];
    for (let i = 0; i <= n; i++) {
      if (arr.indexOf(i) == -1) {
        arrmiss.push(i);
      }
    }
    return arrmiss;
  }
  return console.log("Error");
}

console.log(MissingNumber([0, 2, 3, 4], 6));
