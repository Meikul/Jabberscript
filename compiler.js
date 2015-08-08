function compile(){
  rawInput=document.getElementById('input').value.toLowerCase();
  input=rawInput.split(' ');
  console.log(input);
  var recognizedWords = [
    'if',
    'while'
  ];
  var objects=[];
  var lists=[];
  var thingTypes=[];
  var script = '';
  var compare = false;
  var nextWord;
  var prevWord;
  var word;
  var exami;
  var examWord;
  var examString='';
  for(i=0;i<input.length;i++){
    word=input[i];
    if(isRecWord(word)){
      //not recognized
      if(word.substring(word.length-3,word.length-1)==="'s"||word.substring(word.length-3,word.length-1)==="s'"){
        //object
        script+=word+' = new Object();';
        objects.push(word);
        if(input[i+2]==='is'){//attribute is a single value
          exami=3;
          examString='';
          while(isRecWord(input[i+exami]) && senEnd(input[i+exami-1])){//creates a string until end of sentence or until trigger word.
            examString+=input[i+exami];
            exami++;
          }
          script+=word+'.'+nextWord+'="'+examString+'";';
          i+=exami;
          }
        else if (input[i+2]==='are'){//attribute is an array
          script+=word+'.'+nextWord+'=[';
          exami=3;
          examWord=input[i+exami];
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
          //skip
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
          //skip
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
              //skip
              }
            if (input[i+3]==='less'){
              script+='<';
              if(input[i+5]==='or'&&input[i+6]==='equal'){
                script+='=';
                //skip
                }
            }else if (input[i+3]==='greater']){
              script+='>';
              if(input[i+5]==='or'&&input[i+6]==='equal'){
                script+='=';
                //skip
                }
            }
          } else if(input[i+2]==="isn't"){
            script+='!';
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
function isRecWord(w){
  if(recognizedWords.indexOf(w)===-1){
    return false;
  }else{
    return true;
  }
}
function senEnd(w){
  if(w.substring(w.length-2, w.length-1)==='.'){
    return true;
  }else{//if not the end of sentence then returns what last character is.
    return w.substring(w.length-2, w.length-1);
  }
}
function error(message){
  alert(message);
}