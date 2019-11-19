
const bible = (bLanguage, bVersion) =>{
    return require(`./${bLanguage}/${bVersion}`)();

}

const bPT = bible('pt-br', 'NVI');
const bEN = bible('en','KJV');
const bAR = bible('ar', 'SVD')


console.log("Protugues: " + bPT['mateus'][1][1],`
` +"Ingles: " + bEN['matthew'][1][1]+`
` +'Arabe: '+  bAR['matthew'][1][1]);

