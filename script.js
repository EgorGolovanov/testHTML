document.getElementById("button").addEventListener("click", addToUl);
document.querySelector('ul').onclick = function(e) {
  const dbutton = e.target.closest('.delete');
  if (!dbutton) {
    return;
  }
  
  dbutton.parentElement.remove();
}

function addToUl() {
	var ul = document.getElementById("list-item");
	var li = document.createElement("li");
	var text = document.getElementById("text-input");
	if (text.value != "") {
		var dbutton = "<button class=\"delete\" id=\"dbutton\">X</button>"
		text.value += dbutton;
		li.innerHTML = text.value;
		ul.append(li);
		text.value = "";
	}
}
