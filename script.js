function addToUl() {
  var ul = document.getElementById("list-item");
  var li = document.createElement("li");
  var text = document.getElementById("text-input");
  if (text.value != "") {
	li.innerHTML = text.value;
	ul.append(li);
	text.value = "";
	}
}
