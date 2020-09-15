console.log("yahallo");
// create hook to the dom elements for manipulation
let result_panel = document.querySelector("#result");
let clipboard = document.querySelector("#clipboard");
let length = document.querySelector("#length");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");
let generate = document.querySelector("#generate");

// create object for holding references to random character function
const random_func = {
  upper: random_uppercase,
  lower: random_lowercase,
  number: random_number,
  symbol: random_symbol
};

function generate_password(length, upper, lower, number, symbol) {
// init password value 
  let generated_pasword = "";
// calculate number of character set with a true option value
  let type_count = upper + lower + number + symbol;
  console.log(type_count)
// generate an  array of objects that contains a key/value pair of selected character set and it's option value
  let type_arr = [{upper} , {lower} , {number} , {symbol}].filter(item => Object.values(item)[0])
  console.log(type_arr)
// if number of character set with a true option value is 0 return out of function
  if(type_count === 0 ){
    return "" ;
  }
//h loop through the [length] amount of times to the random functions and build the generated password string  
  for(let i = 0 ; i < length ; i+= type_count){
// loop over the selected character set and extract its function reference name
    type_arr.forEach( type =>{
    const func_name = Object.keys(type)[0]
// generate a random character for each character set using its function reference name
    generated_pasword += random_func[func_name]()
    })
  }

// cut password length down to the selected length
  let final_paswword =   generated_pasword.slice(0  ,length)
  console.log(final_paswword.length)

// return the generated password string
  return final_paswword;
}

// click event to generate password
generate.addEventListener("click", () => {
  let length_opt = length.value;
  let upper_opt = uppercase.checked;
  let lower_opt = lowercase.checked;
  let number_opt = numbers.checked;
  let symbols_opt = symbols.checked;

  console.log(
    length_opt,
    upper_opt,
    lower_opt,
    number_opt,
    symbols_opt
  );

  result_panel.textContent = generate_password(
    length_opt,
    upper_opt,
    lower_opt,
    number_opt,
    symbols_opt
  );
});

// copy password to clipboard
clipboard.addEventListener("click" , ()=>{
  if(result_panel.textContent ==""){
    return
  }
  let copied_text = result_panel.textContent;
  let text_area = document.createElement("textarea")
  document.body.appendChild(text_area)
  text_area.value = copied_text
  text_area.select()
  document.execCommand("copy")
  document.body.removeChild(text_area)

  alert("copied to the clipboard")
})

// functions for generating random characters 
function random_lowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function random_uppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function random_number() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function random_symbol() {
  const symbols = "~`!@#$%^&*()_-}{][|?/><.,;:";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(random_symbol());
