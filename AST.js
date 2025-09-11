function error(statement) {
  output.textContent = statement;
  output.style.color = "red";
}

class Program {

  constructor(){
    this.functions = [];
  }

  print(){
    for(let i = 0; i < this.functions.length; i++){
      this.functions[i].print();
    }
  }

}

let id = 0;

//TODO: currently no support for parameters, or representing them
class FunctionNode {

  constructor(type, name){
    this.type = type;
    this.name = name;
    id++;
    this.id = id;
    this.statements = [];
  }

  print(){
    console.log("id: <" + this.id + ">", this.type, this.name + "()"); 
  }

}

class AST {

  constructor(tokens){
  
    //AST program enter
    this.root = new Program();

    let tmp = this.root;

    for(let i = 0; i < tokens.length; i++){
      if(tokens[i].type == "identifier"){
        //is it a function?
        if(tokens[i+1].type == "open_parenthesis"){
          if(tokens[i-1].type == "type"){
            tmp.functions.push(new FunctionNode(tokens[i-1].name, tokens[i].name));
          }
          else {
            error("identifier " + tokens[i] + " is an undefined function");
            return;
          }
        } else { 
            error("identifier " + tokens[i] + " is unknown");
            return;
        }
      }

      if(tokens[i].type == "return"){
        if(typeof(tmp) == FunctionNode){
          //TODO: where I left off, tmp isn't being recognised as functionNode
          tmp.statements.push(tokens[i]);
        }
        else {
          console.log(tmp, typeof(tmp));
          error("cannot return outside of function");
          return;
        }
      }

      if(tokens[i].type == "open_braces"){
        //entering body
        tmp = this.root.functions[this.root.functions.length - 1];
      }

      if(tokens[i].type == "close_braces"){
        //exiting body
        tmp = this.root;
      }

    }

  }

  print(){
    this.root.print();
  }

};
