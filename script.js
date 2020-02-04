document.getElementById("button").addEventListener("click", addToUl);

document.querySelector('ul').addEventListener("click", function(e) {
  const dbutton = e.target.closest('.delete');
  if (!dbutton) {
    return;
  }
  
  dbutton.parentElement.remove();
});

document.querySelector('ul').addEventListener("click", function(e) {
	const editbutton = e.target.closest('.edit');
	if (!editbutton) {
		return;
	}
	let newtext = document.getElementById("text-input");
	let li = editbutton.parentElement;
	li.children[0].style.display = "none";
	li.children[1].style.display = "none";
	li.children[2].style.display = "none";
	li.children[3].style.display = "inline";
	li.children[4].style.display = "inline";	
	let input = document.createElement("input");
	input.id = "edit-input"
	input.type = "text";
	input.value = li.children[0].text;
	li.prepend(input);
});


document.querySelector('ul').addEventListener("click", function(e) {
	const canselbutton = e.target.closest('.cansel');
	const okbutton = e.target.closest('.ok');
	if (!okbutton && !canselbutton) {
		return;
	}
	
	let li = okbutton ? okbutton.parentElement : canselbutton.parentElement;
	let new_text = li.children[0].value;
	
	li.removeChild(li.firstChild);
	li.children[1].style.display = "inline";
	li.children[2].style.display = "inline";
	li.children[3].style.display = "none";
	li.children[4].style.display = "none";
	
	if (okbutton) {
		if (new_text != "")
			li.children[0].text = new_text;	
	}
	li.children[0].style.display = "inline";
});


function addToUl() {
	let ul = document.getElementById("list-item");
	let li = document.createElement("li");
	let text = document.getElementById("text-input");
	if (text.value != "") {
		let value = "<a>" + text.value + "</a>";
		let dbutton = "<button class=\"delete\" id=\"dbutton\">X</button>";
		let editbutton = "<button class=\"edit\" id=\"editbutton\">Edit</button>";
		let okbutton = "<button class=\"ok\" id=\"okbutton\">Ok</button>";
		let canselbutton = "<button class=\"cansel\" id=\"canselbutton\">Cansel</button>";
		li.innerHTML = value + dbutton + editbutton + okbutton + canselbutton;
		ul.append(li);
		text.value = "";
	}
}
