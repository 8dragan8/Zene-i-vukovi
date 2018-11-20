function tagDefragment(htmlInput) {
    let out = [];
    htmlInput.replace(/<(\w*\d*(?!span))\s(.*?)>([\D\d]*?)<\/\1>/gm, (match, p1, p2, p3, offset, string) => {
        // console.log("p1 = " + p1.slice(0, 20));
        // console.log("p2 = " + p2.slice(0, 20));
        // console.log("p3 = " + p3.slice(0, 20));

        let attr = {};
        p2.replace(/(class|style|href)="(.*?)"/gm, (_match, a1, a2) => {
            let parametri = {};
            if (a1 == 'class') {
                parametri = a2.split(' ');
            }
            else if (a1 == 'style') {
                a2.replace(/(\w*-?\w*):\s*(-?\d*\w*%?);/gm, (_match, s1, s2) => {
                    parametri[s1] = s2;
                });
            }
            else if (a1 == 'href') {
                parametri = a2;

            }
            attr[a1] = parametri;
        });


        let obj = {}
        // if (offset != 0) {

        // let pocetak = string.slice(0, offset)

        // obj = { 'tag': p1, 'attributes': attr, 'html': [pocetak, p3] };

        // } else {
        obj = { 'tag': p1, 'attributes': attr, 'html': p3 };
        // }
        // console.log(pocetak);


        out.push(obj);

    });
    if (out.length === 0) {

        return htmlInput
    }
    else if (typeof out != 'string' && !(out instanceof String)) {
        let temp = []
        for (let i in out) {

            temp = tagDefragment(out[i].html)
            out[i].html = temp

        }
        return out;
        // } else {

    }
}
exports.tagDefragment = tagDefragment;