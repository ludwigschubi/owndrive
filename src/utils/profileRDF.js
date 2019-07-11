import rdf from 'rdflib';
const ns = require('solid-namespace')(rdf);

export const editProfile = (key, value, prevValues, webId) => {
    console.log(value, prevValues);

    let blankId;
    let prevVal;

    if (Array.isArray(prevValues)) {
        blankId = prevValues[1];
        prevVal = prevValues[0];
    }

    const store = rdf.graph();
    const updater = new rdf.UpdateManager(store);
    const ins = [];
    const del = [];
    switch (key) {
        case 'webId':
            console.log('Changing webId is currently not possible');
            break;
        case 'name':
            ins.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.foaf('name'),
                    rdf.lit(value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.foaf('name'),
                    rdf.lit(prevValues),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'emails':
            ins.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('mailto:' + value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym(prevVal),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'telephones':
            ins.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('tel:' + value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym(prevVal),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'picture':
            ins.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vcard('hasPhoto'),
                    rdf.sym(value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vscard('hasPhoto'),
                    rdf.sym(prevValues),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'emails':
            ins.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('mailto:' + value[0]),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('mailto:' + prevVal),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'job':
            ins.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vcard('role'),
                    rdf.lit(value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vcard('role'),
                    rdf.lit(prevValues),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'bio':
            ins.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vcard('note'),
                    rdf.lit(value),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(webId),
                    ns.vcard('note'),
                    rdf.lit(prevValues),
                    rdf.sym(webId).doc()
                )
            );
            break;
        case 'telephones':
            ins.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('tel:' + value[0]),
                    rdf.sym(webId).doc()
                )
            );
            del.push(
                rdf.st(
                    rdf.sym(blankId),
                    ns.vcard('value'),
                    rdf.sym('tel:' + prevVal),
                    rdf.sym(webId).doc()
                )
            );
            break;
    }
    return updater.update(del, ins);
};
