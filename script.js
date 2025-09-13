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

  for(let i = 0; i < tree.root.functions.length; i++){
    asmCode += "\n" + tree.root.functions[i].name + ":";
    
    // TODO: no way to tell what the type of an expression is, no way to tell if a literal is a number or a char
    for(let j = 0; j < tree.root.functions[i].statements.length; j++){
      if(tree.root.functions[i].statements[j].tokens[0].type == "return"){
        if(tree.root.functions[i].statements[j].tokens[1].type == "literal"){
          asmCode += "\n\tmovl\t$" + tree.root.functions[i].statements[j].tokens[1].name + ", %eax";
          asmCode += "\n\tret";
        }
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
