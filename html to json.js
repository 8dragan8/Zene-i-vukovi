const { tagDefragment } = require("./tagDefragment");

const fs = require('fs')

fs.readFile('input\\Zene koje trce s vukovima - Clarissa Pinkola Estes.html', 'utf-8', (err, data) => {
    if (err) throw err
    // console.log(data)
    let temp = []

    let output = ''

    output = data.replace(/([^\.>])(\r|\n)(\s*)/gm, (_match, mch1) => {

        if (mch1 == "\r" || mch1 == "\n") {
            return " "
        }
        else {
            return mch1 + " "
        }

    })
    temp = tagDefragment(output);
    output = temp


    fs.writeFile('output\\out.json', JSON.stringify(output), (err) => {
        if (err) throw err
        console.log('Fajl uspesno ispisan');

    })

})


