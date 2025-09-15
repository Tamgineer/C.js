function error(statement) {
  output.textContent = statement;
  output.style.color = "red";
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

class ReturnNode {
  constructor(){
    this.expression = [];
  }
  
  print(){
    let x = "\t\treturn ";
    for(let i = 0; i < this.expression.length; i++){
      if(this.expression[i] instanceof Constant){
        x += this.expression[i].value;
      }
      if(this.expression[i] instanceof UnaryOperation){
        if(this.expression[i].operator == "NEGATION_OPERATOR"){
          x += "-";
        } else {
          x += this.expression[i].operator;
        }
      }
    }

    console.log(x + ";");
  }

  generate(){
    let out = "";
    // TODO: more of a try, consider recursion over doing it on a loop
    for(let i = 0; i < this.expression.length; i++){
      if(this.expression[i] instanceof UnaryOperation){
        if(this.expression[i].operator == "NEGATION_OPERATOR"){
          out += "\n\tmovl\t$" + this.expression[i+1].value +", %eax";
          out += "\n\tneg\t%eax";
          i+=2;
        }
      }
    }
    out += "\n\tret";
    return out;
  }

}

class Expression{
}

class Constant{
  constructor(value){
    this.value = value;
  }
}

class UnaryOperation{
  constructor(operator){
    this.operator = operator;
  }
}

class AST {

  constructor(tokens){
  
    //AST program enter
    this.functions = [];

    let tmp = this.functions;

    for(let i = 0; i < tokens.length; i++){
      if(tokens[i].type == "identifier"){
        //is it a function?
        if(tokens[i+1].type == "open_parenthesis"){
          if(tokens[i-1].type == "type"){
            this.functions.push(new FunctionNode(tokens[i-1].name, tokens[i].name));
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

      if(tokens[i].type == "semicolon"){
        // TODO: ensure that the semicolon is in the right place
        
        //for the time being skip
        return;
      }

      if(tokens[i].type == "return"){
        if(tmp instanceof FunctionNode){
          let x = new ReturnNode();
          
          i++;
          while(tokens[i].type != "semicolon"){
            
            switch(tokens[i].type){
            
              case "NUMERIC_LITERAL":
                x.expression.push(new Constant(tokens[i].name));
                i++;
                break;

              case "NEGATION_OPERATOR":
                if(x.expression[x.expression.length - 1] instanceof Constant){
                  error("unary operator after constant");
                }
                x.expression.push(new UnaryOperation(tokens[i].type));
                i++;
                break;

              default:
              // TODO: Logical negation && bitwise complement
                error("operator not implemented yet");

            }

            if(tokens[i].type == "NUMERIC_LITERAL"){
              continue;
            }

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
        tmp = this.functions[0];
      }

      if(tokens[i].type == "close_braces"){
        //exiting body
        tmp = this.functions;
      }

    }

  }
  
  print(){
    for(let i = 0; i < this.functions.length; i++){
      this.functions[i].print();
    }
  } 

};
