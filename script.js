const fileInput = document.getElementById("file");
const output = document.getElementById("output");

let input = "";

addEventListener("input", (event) => 
{
    const files = event.target.files[0];

    if(!files){
      output.textContent = "no file found";
      return;
    }

    if (!files.type.startsWith("text")) {
      output.textContent = "Unsupported file type. Please select a text file.", "error";
      return;
    }

    // Read the file
    const reader = new FileReader();
    
    reader.onload = () => {
      input = reader.result;
    };
    
    reader.onerror = () => {
      output.textContent = "Error reading the file. Please try again.", "error";
    };
    reader.readAsText(files);

});

function lexer(){
  
  console.log(input);
  let str = [];
  let regex = /int|main|return|[0-9]|\(|\)|{|}|;/gm;
  str = input.match(regex);
  let out = "";
  let tokens = [];
  console.log(str);

  for(let i = 0; i < str.length; i++){
    switch(str[i]){
   //TODO: all types to be classified 
      
      case "int":
        tokens.push({name: "int", type: "keyword"});
        break;
      
      case "float":
        tokens.push({name: "float", type: "keyword"});
        break;

      case "main":
        tokens.push({name: "main", type: "identifier"});
        break;

      case "(":
        tokens.push({name: "(", type: "open_parenthesis"});
        break;

      case ")":
        tokens.push({name: ")", type: "close_parenthesis"});
        break;

      case "{":
        tokens.push({name: "{", type: "open_braces"});
        break;
      
      case "}":
        tokens.push({name: "}", type: "close_braces"});
        break;

      case "return":
        tokens.push({name: "return", type: "return"});
        break;

      case ";":
        tokens.push({name: "semicolon", type: "semicolon"});
        break;

      case "0":
        tokens.push({name: "0", type: "literal"});
        break;
      
      case "1":
        tokens.push({name: "1", type: "literal"});
        break;

      case "2":
        tokens.push({name: "2", type: "literal"});
        break;

      case "3":
        tokens.push({name: "3", type: "literal"});
        break;

      case "4":
        tokens.push({name: "4", type: "literal"});
        break;

      case "5":
        tokens.push({name: "5", type: "literal"});
        break;

      case "6":
        tokens.push({name: "6", type: "literal"});
        break;

      case "7":
        tokens.push({name: "7", type: "literal"});
        break;

      case "8":
        tokens.push({name: "8", type: "literal"});
        break;

      case "9":
        tokens.push({name: "9", type: "literal"});
        break;

      default:
        //this is to throw an error at the parsing step
        tokens.push({name: str[i], type: "???"});
        break;
    }
  }

  for(let i = 0; i < tokens.length; i++){
    console.log(tokens[i].name + " : " + tokens[i].type);
  }
  
  console.log(tokens);

  output.textContent = "compiled!!"; 

}

function compile(){
  
  lexer();

}
