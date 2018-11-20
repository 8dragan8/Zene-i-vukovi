
var fs = require('fs');
var htmlToJson = require('html-to-json');

fs.readFile('input\\Zene koje trce s vukovima - Clarissa Pinkola Estes.html', 'utf-8', (err, data) => {
    if (err) throw err
    // console.log(data)
    var promise = htmlToJson.parse(data, {
        'text': function ($doc) {
          return $doc.find('p').text();
        }
      }, function (err, result) {
          if (err) throw err
        console.log(result);
        
        fs.writeFile('output\\out.json', JSON.stringify(result), (err) => {
            if (err) throw err
            console.log('Fajl uspesno ispisan');
            
        })
    });

})