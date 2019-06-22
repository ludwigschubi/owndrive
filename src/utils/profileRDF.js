import rdf from 'rdflib';
import auth from 'solid-auth-client';
const ns = require('solid-namespace')(rdf);

export const editProfile = (key, value, prevValues) => {
    console.log(value, prevValues);

    let blankId;
    let prevVal;
    
    if (Array.isArray(prevValues)) {
        blankId = prevValues[1];
        prevVal = prevValues[0];
    }

    return auth.trackSession((session) => {
        if (!session) {
            return undefined;
        } else {
            const store = rdf.graph();
            const updater = new rdf.UpdateManager(store);
            const fetcher = new rdf.Fetcher(store);
            return fetcher.load(session.webId).then(() => {
                const ins = [];
                const del = [];
                switch (key) {
                    case 'webId':
                        console.log('Changing webId is currently not possible');
                        break;
                    case 'name':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.foaf('name'),
                                rdf.lit(value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.foaf('name'),
                                rdf.lit(prevValues),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'emails':
                        ins.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('mailto:' + value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym(prevVal),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'telephones':
                        ins.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('tel:' + value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym(prevVal),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'picture':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('hasPhoto'),
                                rdf.sym(value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vscard('hasPhoto'),
                                rdf.sym(prevValues),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'emails':
                        ins.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('mailto:' + value[0]),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('mailto:' + prevVal),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'job':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('role'),
                                rdf.lit(value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('role'),
                                rdf.lit(prevValues),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'bio':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('note'),
                                rdf.lit(value),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('note'),
                                rdf.lit(prevValues),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                    case 'telephones':
                        ins.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('tel:' + value[0]),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(blankId),
                                ns.vcard('value'),
                                rdf.sym('tel:' + prevVal),
                                rdf.sym(session.webId).doc()
                            )
                        );
                        break;
                }
                return updater.update(del, ins).then((response) => {
                    return response;
                });
            });
        }
    });
};
