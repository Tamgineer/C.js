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
    for(let i = 0; i < this.statements.length; i++){
      this.statements[i].print();
    }
  }

}

class StatementLeaf {

  constructor(){
    this.tokens = [];
  }

  print(){
    let stmnt = "\t\t";
    for(let i = 0; i < this.tokens.length; i++){
      stmnt += this.tokens[i].name + " ";
    }
    console.log(stmnt);

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
        if(tmp instanceof FunctionNode){
          let x = new StatementLeaf();
          x.tokens.push(tokens[i]);
          while(tokens[i].type != "semicolon"){
            x.tokens.push(tokens[++i]);
          }
          tmp.statements.push(x);
        }
        else {
          error("cannot return outside of function");
          return;
        }
      }

      if(tokens[i].type == "open_braces"){
        //entering body
        tmp = this.root.functions[0];
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
