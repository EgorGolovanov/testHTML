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


document.addEventListener("click", function(e) {
	if (e.target && e.target.matches("input[name='sort-radiobutton']")) {
		Sorting(e.target);
	}
});

// функция для добавления элементов в список
function addToUl() {
	
	let ul = document.getElementById("list-item");
	let text = document.getElementById("text-input");
	let li = document.createElement("li");
	
	//при пустом значении текста не добавляем в список
	if (text.value != "") {
		let number = "<a class= id>" + (ul.children.length + 1) + "</a>"
		let value = "<a class= value>" + text.value + "</a>";
		li.innerHTML = number + value + blockOfButtons;
		ul.append(li);
		text.value = "";
	}
}

//функция для сортировки ul списка, где fields - входное условие для выбора сортировки
function Sorting(fields) {
    let listUl = document.getElementById('list-item');
    let parent = listUl.parentNode;
    //let newList = (fields.value.indexOf('number') == -1) ? textSort(fields) : numberSort(fields);
    let newList = Sort(fields); 
    let rr = 0;

    parent.insertBefore(newList, listUl);
    parent.removeChild(listUl);
    
    newList.id = 'list-item';
}

//функция создания ul по входному массиву
function makeUl(array) {
    let list = document.createElement('ul'); 

    for (let i = 0; i < array.length; i++) {

        list.appendChild(array[i]);
    }

    return list;
}

//функция сортировки массива по id
function Sort(fields) {
    var nodeList = document.querySelectorAll('li');
    var itemsArray = [];

    for (var i = 0; i < nodeList.length; i++) {    
        itemsArray.push(nodeList[i]);
    }

    itemsArray.sort(function(nodeA, nodeB) {
        //выбор нужнго поля для сортировки
        let textA = nodeA.querySelector('.' + fields.value).text;
        let textB = nodeB.querySelector('.' + fields.value).text;
        //проверка числовая или текстовая сортировка
        let A = parseInt(textA);
        let B = parseInt(textB);
        
        if (!A) A = textA;        
        if (!B) B = textB;
        
        if (A < B) return -1;
        if (A > B) return 1;

        return 0;
    });

    if (fields.className.indexOf('asc') == -1) itemsArray.reverse();
    
    return makeUl(itemsArray);
}


