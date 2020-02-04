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
	li.children[1].style.display = "none";
	li.children[2].style.display = "none";
	li.children[3].style.display = "none";
	li.children[4].style.display = "inline";
	li.children[5].style.display = "inline";	
	let input = document.createElement("input");
	input.id = "edit-input"
	input.type = "text";
	input.value = li.children[1].text;
	li.insertBefore(input, li.children[1]);
});


document.querySelector('ul').addEventListener("click", function(e) {
	const canselbutton = e.target.closest('.cansel');
	const okbutton = e.target.closest('.ok');
	if (!okbutton && !canselbutton) {
		return;
	}
	
	let li = okbutton ? okbutton.parentElement : canselbutton.parentElement;
	let new_text = li.children[1].value;
	
	li.removeChild(li.children[1]);
	li.children[2].style.display = "inline";
	li.children[3].style.display = "inline";
	li.children[4].style.display = "none";
	li.children[5].style.display = "none";
	
	if (okbutton) {
		if (new_text != "")
			li.children[1].text = new_text;	
	}
	li.children[1].style.display = "inline";
});

document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[name='sort-radiobutton']"))) {
		sortList();
	}
});

function addToUl() {
	let ul = document.getElementById("list-item");
	let li = document.createElement("li");
	let text = document.getElementById("text-input");
	if (text.value != "") {
		let number = "<a>" + (ul.children.length + 1) + "</a>"
		let value = "<a>" + text.value + "</a>";
		let dbutton = "<button class=\"delete\" id=\"dbutton\">X</button>";
		let editbutton = "<button class=\"edit\" id=\"editbutton\">Edit</button>";
		let okbutton = "<button class=\"ok\" id=\"okbutton\">Ok</button>";
		let canselbutton = "<button class=\"cansel\" id=\"canselbutton\">Cansel</button>";
		li.innerHTML = number + value + dbutton + editbutton + okbutton + canselbutton;
		ul.append(li);
		text.value = "";
	}
}

function sortList() {
	let list, i, switching, b, shouldSwitch, dir, switchcount = 0;
	list = document.getElementById("list-item");
	switching = true;
	while (switching) {
		switching = false;
		li = list.getElementsByTagName("LI");
		if (li.length == 0) return;
		for (i = 0; i < (li.length - 1); i++) {
			shouldSwitch = false;
			if (document.getElementById("alphabet-sort").checked) {
				if (li[i].children[1].text.toLowerCase() > li[i + 1].children[1].text.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (document.getElementById("ralphabet-sort").checked) {
				if (li[i].children[1].text.toLowerCase() < li[i + 1].children[1].text.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			} else if (document.getElementById("number-sort").checked) {
				if (Number(li[i].children[0].text) > Number(li[i + 1].children[0].text)) {
					shouldSwitch = true;
					break;
				}
			} else if (document.getElementById("rnumber-sort").checked) {
				if (Number(li[i].children[0].text) < Number(li[i + 1].children[0].text)) {
					shouldSwitch = true;
					break;	
				}
			}
		}
	if (shouldSwitch) {
		li[i].parentNode.insertBefore(li[i + 1], li[i]);
		switching = true;
		switchcount ++;
    } else if (switchcount == 0) {
			switching = true;
	}
	}
}

