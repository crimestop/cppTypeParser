function show_hide(ev,slf){
	ev.stopPropagation();
	let style = window.getComputedStyle(slf.firstElementChild);
	if (style.display === "inline-block")
		slf.firstElementChild.style.display = "none";
	else
		slf.firstElementChild.style.display = "inline-block";
	// alert(document.getElementById("version-url").href);
}
function show_hide_wrapper(event){
	show_hide(event,this);
}

class Type{
	words;
	pos;

	constructor(words){
		this.words = words;
		this.pos = 0;
	}
	next(){
		this.pos++;
	}
	ended(){
		return this.pos >= this.words.length;
	}
	present(){
		if (this.pos < this.words.length)
			return this.words[this.pos];
		else
			return '';
	}
}

function parse(){
	const input = document.getElementById("input");
	const output = document.getElementById("output");
	while (output.firstChild) {
		output.removeChild(output.firstChild);
	  }
	//alert(input.value);
	parse_inner(output,new Type(input.value));
}

function parse_inner(slf,type){

	let this_char;
	let child;
	let grandchild;
	let in_bracket = false;
	let string_item = '';
	while(this_char = type.present()){  // while this_char !== ''
		if (!in_bracket && (this_char === ',' || this_char === '>')){
			if(string_item)
				slf.appendChild(document.createTextNode(string_item));
			return;
		}

		type.next();
		string_item += this_char;

		if(this_char === '<' )
			in_bracket = true;
		if(this_char === '>' && in_bracket)
			in_bracket = false;

		if(this_char === '<' || this_char === ',' ){
			if(string_item)
				slf.appendChild(document.createTextNode(string_item));
			string_item = '';
			child = slf.appendChild(document.createElement("div"));
			child.className = "elem";
			child.addEventListener("click",show_hide_wrapper);
			child.appendChild(document.createTextNode('\u200b'));
			grandchild = child.appendChild(document.createElement("div"));
			grandchild.className = "elem-content";
			parse_inner(grandchild,type);
		}
	}
	if(string_item)
		slf.appendChild(document.createTextNode(string_item));
}