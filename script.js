//основные константы для ипользования
const dbutton = "<button class=\"delete\" id=\"dbutton\">X</button>";
const editbutton = "<button class=\"edit\" id=\"editbutton\">Edit</button>";
const okbutton = "<button class=\"ok\" id=\"okbutton\">Ok</button>";
const canselbutton = "<button class=\"cansel\" id=\"canselbutton\">Cansel</button>";
const blockOfButtons = dbutton + editbutton + okbutton + canselbutton;

//слушатель для обработки событий при нажатии на кнопку "add"
document.getElementById("button").addEventListener("click", addToUl);

//слушатель для обработки событий при нажатии на кнопку "X"
document.querySelector('ul').addEventListener("click", function(e) {
  const dbutton = e.target.closest('.delete');
  if (!dbutton) {
    return;
  }
  
  dbutton.parentElement.remove();
});

//слушатель для обработки событий при нажатии на кнопку "edit"
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

//слушатель для обработки событий при нажатии на кнопку "cansel"
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

//слушатель для обработки событий при выборе сортировки списка 
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='number-sort']"))) {
		listSort(true, true);
	}
});
//слушатель для обработки событий при выборе сортировки списка
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='rnumber-sort']"))) {
		listSort(false, true);
	}
});
//слушатель для обработки событий при выборе сортировки списка
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='alphabet-sort']"))) {
		listSort(true, false);
	}
});
//слушатель для обработки событий при выборе сортировки списка
document.addEventListener("click", function(e) {
	if (e.target && (e.target.matches("input[id='ralphabet-sort']"))) {
		listSort(false, false);
	}
});

// функция для добавления элементов в список
function addToUl() {
	
	let ul = document.getElementById("list-item");
	let text = document.getElementById("text-input");
	let li = document.createElement("li");
	
	//при пустом значении текста не добавляем в список
	if (text.value != "") {
		let number = "<a>" + (ul.children.length + 1) + "</a>"
		let value = "<a>" + text.value + "</a>";
		li.innerHTML = number + value + blockOfButtons;
		ul.append(li);
		text.value = "";
	}
}

//функция для сортировки списка
function listSort(order, choose) {
	let textList = [], numberList = [], index;
	let list = li = document.getElementsByTagName("li");
	
	//создание временных массивов для сортировки 
	for (let i = 0; i < list.length; i++) {
		textList.push(list[i].children[1].text.toLowerCase());
		numberList.push(list[i].children[0].text);
	}
	
	let newTextList = textList.slice();
	let newNumberList = numberList.slice();
	
	//сортировка в зависимости от входных параметров
	if (!choose) {
		textList.sort();
		
		if (!order) textList.reverse();
		
		//относительно сортировки по алфавиту меняем числовой массив
		for (let i = 0; i < newTextList.length; i++) {
			index = newTextList.indexOf(textList[i]);
			newNumberList[i] = numberList[index];
		}
		
		newTextList = textList;
	} else {
		numberList.sort();
		
		if (!order) numberList.reverse();
		
		//относительно сортировки по числам меняем текстовый массив
		for (let i = 0; i < newNumberList.length; i++) {
			index = newNumberList.indexOf(numberList[i]);
			newTextList[i] = textList[index];
		}
		
		newNumberList = numberList;
	}
	
	//перезапись отсортированных массивов в исходный список
	for (let i = 0; i < list.length; i++) {
		list[i].children[0].text = newNumberList[i];
		list[i].children[1].text = newTextList[i];
	}
}

