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
  let regex = /int|main|return|[0-9]|\(|\)|{|}|-|~|!|;/gm;
  str = input.match(regex);
  let out = "";
  let tokens = [];
  console.log(str);

  // TODO: Identify tokens for characters

  for(let i = 0; i < str.length; i++){
    switch(str[i]){
   // TODO: all types to be classified 
      
      case "int":
        tokens.push({name: "int", type: "type"});
        break;
      
      case "float":
        tokens.push({name: "float", type: "type"});
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
        tokens.push({name: ";", type: "semicolon"});
        break;

      case "0":
        tokens.push({name: "0", type: "NUMERIC_LITERAL"});
        break;
      
      case "1":
        tokens.push({name: "1", type: "NUMERIC_LITERAL"});
        break;

      case "2":
        tokens.push({name: "2", type: "NUMERIC_LITERAL"});
        break;

      case "3":
        tokens.push({name: "3", type: "NUMERIC_LITERAL"});
        break;

      case "4":
        tokens.push({name: "4", type: "NUMERIC_LITERAL"});
        break;

      case "5":
        tokens.push({name: "5", type: "NUMERIC_LITERAL"});
        break;

      case "6":
        tokens.push({name: "6", type: "NUMERIC_LITERAL"});
        break;

      case "7":
        tokens.push({name: "7", type: "NUMERIC_LITERAL"});
        break;

      case "8":
        tokens.push({name: "8", type: "NUMERIC_LITERAL"});
        break;

      case "9":
        tokens.push({name: "9", type: "NUMERIC_LITERAL"});
        break;

      case "-":
        tokens.push({name: "-", type: "NEGATION_OPERATOR"});
        break;

      case "~":
        tokens.push({name: "~", type: "BITWISE_COMPLEMENT_OPERATOR"});
        break;

      case "!":
        tokens.push({name: "!", type: "LOGICAL_NEGATION_OPERATOR"});
        break;

      default:
        //this will most likely be an identifier
        tokens.push({name: str[i], type: "identifier"});
        break;
    }
  } 
  
  output.textContent = "compiled!!"; 
  
  return tokens;

}

let asmCode = "";

function parse(tree){
  //head of the file
  asmCode += "\t.globl main";

  for(let i = 0; i < tree.functions.length; i++){
    asmCode += "\n" + tree.functions[i].name + ":";
    
    // TODO: no way to tell what the type of an expression is, no way to tell if a literal is a number or a char
    for(let j = 0; j < tree.functions[i].statements.length; j++){
      if(tree.functions[i].statements[j] instanceof ReturnNode){
        asmCode += tree.functions[i].statements[j].generate();
      }
    }
  }
 
  asmCode += "\n";
  //show download button
}

function compile(){

  id = 0;

  let tree = new AST(lexer());

  tree.print();

  parse(tree);

  //Profit???

}

async function download(){
  let filehandle = await window.showSaveFilePicker();
  let stream = await filehandle.createWritable();
  await stream.write(asmCode);
  await stream.close();
}
