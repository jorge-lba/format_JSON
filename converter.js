var fs = require('fs');

const bLanguage = 'de';
const bVersion = 'Schlachter';
const arrayWay = ['books','JSON'];

let way = `.`;
const arrayBook =[];
const jsCall = [];
const jsonFile = bLanguage+bVersion;

arrayWay.push(bLanguage);
arrayWay.push(bVersion);

const getJSON = require(`./bible/JSON/${jsonFile}.json`);

for(let a = 0; a < arrayWay.length; a++){
    way += `/${arrayWay[a]}`
    
    if(!fs.existsSync(way)){
        fs.mkdirSync(way)
    }
}

const assentRemove = (text) =>{       
    text = text.toString().toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text.replace(' ','').replace(' ', '').replace('1','I').replace('2','II').replace('3','III');                 
};

for (let w =0; w < getJSON.length; w++){
    
    let print = getJSON[w]
    print = print.chapters.map(e => e)

    const obj = new Object;
    const name = getJSON[w].name
    const book = assentRemove(name)

    arrayBook.push(book);

    obj.language = bLanguage
    obj.version = getJSON.verson
    obj.title = name;
    obj.abbreviation = assentRemove(getJSON[w].abbrev);

    if(w < 39){
        obj.newTestament = false;
    }else{
        obj.newTestament = true;

    }


    const array = value => {
        const fullArray = [];

        for(let i = 0; i < print.length; i++){
            const print2 = value[i].map(e => e)
            fullArray[i] = print2;
            obj[i+1] = {};
            
            print2.forEach((element, index) => {
                obj[i+1][index+1] = element    
            });

        }
        return obj;
    }

    array(print)

    jsCall.push(`${book} = require(\`./_${book}.json\`);`)


    fs.writeFile(`${way}/_${book}.json`,`${JSON.stringify(obj)}`, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

fs.writeFile(`${way}/index.js`,`module.exports = () => {

    ${jsCall.join(`
    `)} 

    return {

        ${arrayBook}

    }

}`, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});