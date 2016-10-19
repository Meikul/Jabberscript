// -------------------------------
// if value is value then statement
// object is class with value attribute, value attribute and finalValue finalAttribute
// class have attribute, attribute
// ask text -- prompt("text");
// -------------------------------
function compile()
{
	var inbox = document.getElementById('input');
	var variables = {};
	var raw = inbox.value.toLowerCase();
	inbox.value = '';
	window.console.log(raw);
	var input = raw.split(' ');
	var console = '';
	var j = 0;
	var lastStatement = false;
	for(var i=0; i < input.length; i++)
	{
		word = input[i];
		if (lastChar(word)=='.')
		{
			lastStatement = true;
			word = substring(0, word.length-2);
		}
		switch(word)
		{
			case 'say':
				window.console.log(firstChar(input[i+1]));
				if (firstChar(input[i+1])=='"')
				{
					window.console.log('say string');
					var tempStr = '';
					do
					{
						i++;
						tempStr+=input[i]+' ';
					} while(lastChar(input[i])!='"');
					tempStr = tempStr.substring(1, tempStr.length-2);
					window.console.log(tempStr);
					document.getElementById('log').insertAdjacentHTML("afterbegin", tempStr+'<br>');
				}
				else
				{
					window.console.log('say variable');
					//window.prompt(get(word));
				}
				break;
			case 'ask':
				var tempStr = '';
				var first=i;
				do
				{
					i++;
					tempStr+=input[i]+' ';
				} while(lastChar(input[i]) != '"');
				tempStr = tempStr.substring(1,tempStr.length-2);
				tempStr+=': ';
				inbox.value = tempStr;
				break;
			case 'clear':
				document.getElementById('log').innerHTML = '';
				break;
			default:
		}
		if(lastStatement)
		{
			output+=';';
			lastStatement = false;
		}
	}
}

function createVar(name)
{
	variables[name];
}

function set(v, val)
{
	variables[v] = value;
}

function get(w)
{
	return variables[w];
}

function isRecWord(w)
{
  if(recognizedWords.indexOf(w)==-1){
    return false;
  }else{
    return true;
  }
}

function lastChar(w)
{
	return w.substring(w.length-1);
}

function firstChar(w)
{
	return w.substring(0,1);
}