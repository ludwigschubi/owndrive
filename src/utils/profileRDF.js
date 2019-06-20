import rdf from 'rdflib';
import auth from 'solid-auth-client';
import ns from 'solid-namespace';

export const editProfile = (key, value, prevValue) => {
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
                                ns.vcard('fn'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                    case 'picture':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('hasPicture'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                    case 'emails':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('hasEmail'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                    case 'job':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('role'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                    case 'bio':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('note'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                    case 'telephones':
                        ins.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('hasTelephone'),
                                rdf.lit(value)
                            )
                        );
                        del.push(
                            rdf.st(
                                rdf.sym(session.webId),
                                ns.vcard('fn'),
                                prevValue
                            )
                        );
                        break;
                }
                return updater.update(del, ins);
            });
        }
    });
};
