function dropDown(value) {
  if (dropDownArr.includes(value)) {
    const index = dropDownArr.indexOf(value);
    dropDownArr.splice(index, 1);
  } else {
    dropDownArr.push(value);
  }
  console.log(document.getElementById("fruit").value);
  document.getElementById("fruit").value = 0;
  console.log(document.getElementById("fruit").value);
  document.getElementById("fruit").text = 0;
  document.getElementById("selecteditem").text = dropDownArr;
  console.log(document.getElementById("selecteditem").text);
  console.log(dropDownArr);
}
var dropDownArr = [];
