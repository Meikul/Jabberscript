function compile(){
  rawInput=document.getElementById('input').value.toLowerCase();
  input=rawInput.split(' ');
  console.log(input);
  var recognizedWords = [
    'if',
    'is',
    'are',
    'while',
    'or',
    'and',
    'a',
    'an',
    'list',
    'plus',
    'minus',
    'divided',
    'multiplied',
    ];
    var objects=[];
    var lists=[];
    var thingTypes=[];
  var script = '';
  var compare = false;
  var nextWord;
  var prevWord;
  var word;
  //input.forEach(function(word){
  for(i=0;i<input.length;i++){
    word=input[i];
    nextWord=input[i+1];
    prevWord=input[i-1];
    if(recognizedWords.indexOf(word)===-1){
      //not recognized
      if(word.substring(word.length-3,word.length-1)==="'s"||word.substring(word.length-3,word.length-1)==="s'"){
        //object
        script+=word+' = new Object();';
        objects.push(word);
        if(input[i+2]==='is'){//attribute is a single value
          script+=word+'.'+nextWord+'='+input[i+3]+';';
          i+=2;
        }
        else if (input[i+2]==='are'){//attribute is an array
          script+=word+'.'+nextWord+'=[';
          var exami=3;
          var examWord=input[i+exami];
          while (examWord!==='and'||examWord!==='or'){
            examWord=input[i+exami];
            if(examWord.substring(examWord.length-2,examWord.length-1)===','){//accounts for non-oxford commas
              script+=examWord.substring(0,examWord.length-2)+', ';//with comma
            }else{
              script+=examWord+', ';//without comma
            }
            exami++;
          }
          script+=input[i+exami+1]+'];';
          i+=exami;
        }
      }
      if(input[i+2]==='a'||input[i+2]==='an'){
        if(input[i+3]==='list'){//list data type
          script+=word+'=[];';
          lists.push(word);
        }else{//unrecognized data type
          script+=word+'={type:'+input[i+3]+'};';//new object with 'type' attribute
          thingTypes.push(input[i+3]);
          objects.push(word);
          i+=2;
        }
      }
    }
    else{//recognized
      switch(word){
        case 'if':
          script+='if('+input[i+1];
          if(input[i+2]==='is'){
            if(input[i+3]==='not'){
              script+='!';
              i++;
            }
          } else if(input[i+2]==="isn't"){
            script+='!';
          } else{
            error('"'+input[i+2]+'" at index '+i+' is not a valid if statment operation.');
          }
          if (input[i+3]==='less'){
            script+='<';
          }else if (input[i+3]==='greater']){
            script+='>'
            if(input[i+5]==='or'&&input[i+6]==='equal'){
              script+='=';
            }
          }
          
          break;
        case 'while':
          break;
        case 'is':
          if(nextWord!=='less'&&nextWord!=='greater'){
            else{
              script+=' = ';
            }
          }
          if(nextWord==='a'||nextWord==='an'){
            //var is data type

          }
          break;
        default:
          //defined variable
          break;
      }
    }
  }
  return script;
}
function error(message){
  alert(message);
}