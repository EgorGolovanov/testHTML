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
	if (e.target && (e.target.matches("input[id='number-sort']"))) {
		Sort(true, true);
	}
});
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='rnumber-sort']"))) {
		Sort(false, true);
	}
});
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='alphabet-sort']"))) {
		Sort(true, false);
	}
});
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='ralphabet-sort']"))) {
		Sort(false, false);
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

function Sort(order, choose) {
	let textList = new Array(), 
	numberList = new Array(), 
	newTextList = new Array(), 
	newNumberList= new Array();
	let list = li = document.getElementsByTagName("li");
	
	for (let i = 0; i < list.length; i++) {
		textList.push(list[i].children[1].text.toLowerCase());
		numberList.push(list[i].children[0].text);
	}
	
	newTextList = textList.slice();
	newNumberList = numberList.slice();
	
	if (!choose) {
		textList.sort();
		
		if (!order) textList.reverse();
		
		for (let i = 0; i < newTextList.length; i++) {
			let index = newTextList.indexOf(textList[i]);
			newNumberList[i] = numberList[index];
		}
		
		newTextList = textList;
	} else {
		numberList.sort();
		
		if (!order) numberList.reverse();
		
		for (let i = 0; i < newNumberList.length; i++) {
			let index = newNumberList.indexOf(numberList[i]);
			newTextList[i] = textList[index];
		}
		
		newNumberList = numberList;
	}
	
	for (let i = 0; i < list.length; i++) {
		list[i].children[0].text = newNumberList[i];
		list[i].children[1].text = newTextList[i];
	}
}

