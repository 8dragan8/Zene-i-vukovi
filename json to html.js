const fs = require('fs')

let head = '<!DOCTYPE  html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
    '<html xmlns="http://www.w3.org/1999/xhtml">' +
    '<head>' +
    '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '    <title>Zene koje trce s vukovima - Clarissa Pinkola Estes</title>' +
    '   <link rel="stylesheet" type="text/css" media="screen" href="main.css" />'+
    '</head><body>'

let foot = "</body></html>"



fs.readFile("output\\out.json", "utf-8", (err, data) => {
    if (err) throw err
    let json = JSON.parse(data)
    // console.log(json);
    let body = JsonIteracija(json)



    // for (let i = 0; i < json.length; i++) {


    //     let post = json[i]
    //     let posAttr = post.attributes
    //     let style = ""
    //     let klasa = ""
    //     if (posAttr.style) {
    //         style = 'style = "'
    //         for (let j in posAttr.style) {

    //             style += j + ": " + posAttr.style[j] + ";"

    //         }
    //         style += '"'
    //         console.log(style);

    //     }
    //     if (posAttr.class) {
    //         klasa = 'class = "'

    //         for (let e in posAttr.class) {

    //             klasa += posAttr.class[e]

    //         }
    //         klasa += '" '
    //         console.log(klasa);
    //     }
    //     if (posAttr.href) {
    //         href = 'href = "'+ posAttr.href +'" '

    //         console.log(href);
    //     }



    //     body += `<${post.tag} ${klasa}${style}${href}>${post.html}</${post.tag}>`
    // }

    let html = head + body + foot
    // let html = body



    fs.writeFile('output\\json to html out.html', html, (err) => {
        if (err) throw err
        console.log('Fajl uspesno ispisan');

    })

})

function JsonIteracija(Json) {
    let body = ""

    for (let i in Json) {
        let post = Json[i]
        let posAttr = post.attributes
        let style = ""
        let klasa = ""
        let href = ""
        let html = ""
        if (posAttr.style) {
            style = 'style = "'
            for (let j in posAttr.style) {

                style += j + ": " + posAttr.style[j] + ";"

            }
            style += '"'
            console.log(style);

        }
        if (posAttr.class) {
            klasa = 'class = "'

            for (let e in posAttr.class) {

                klasa += posAttr.class[e]

            }
            klasa += '" '
            console.log(klasa);
        }
        if (posAttr.href) {
            href = 'href = "'+ posAttr.href +'" '

            console.log(href);
        }

        body += `<${post.tag} ${klasa}${style}${href}>`

        if (Array.isArray(post.html)) {

            html=JsonIteracija(post.html)
            
        }
        else{
            html=post.html
        }

        body+=`${html}</${post.tag}>`

        
    }
    return body
    
}