import rdf from 'rdflib';
import auth from 'solid-auth-client';
import { folder } from '../assets/icons/externalIcons';
import { isFlowDeclaration } from '@babel/types';
import { promised } from 'q';
const ns = require('solid-namespace')(rdf);

function getContentType(file) {
    const mimeTypes = {
        py: 'application/x-python-code',
        jpeg: 'image',
        png: 'image',
        ico: 'image',
        mp3: 'audio',
        html: 'text/html',
        xml: 'text/xml',
        ttl: 'text/turtle',
        css: 'text/css',
        txt: 'text/plain',
    };

    if (file.split('.').length > 1) {
        const fileFragments = file.split('.');
        const fileSuffix = fileFragments[fileFragments.length - 1];
        return fileSuffix in mimeTypes ? mimeTypes[fileSuffix] : 'unknown';
    } else {
        return 'folder';
    }
}

function uploadFolderOrFile(file, url) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const fileNameFragments = file.name.split('/');
    const fileName = fileNameFragments[fileNameFragments.length - 1];
    const fileType = file.type ? file.type : 'text/plain';

    return new Promise(function(resolve) {
        const reader = new FileReader();
        reader.onload = function() {
            const data = this.result;
            const filename = encodeURIComponent(fileName);

            fetcher
                .webOperation('PUT', url, {
                    data: data,
                    contentType: fileType,
                })
                .then((response) => {
                    if (response.status === 201) {
                        console.log('Successfully uploaded!');
                        resolve('Success');
                    }
                });
        };
        reader.readAsArrayBuffer(file);
    });
}

function uploadFile(filePath, currPath) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    const reader = new FileReader();
    reader.onload = function() {
        const data = this.result;
        const filename = encodeURIComponent(filePath.name);
        const contentType = getContentType(filePath.name);

        const fileUrl = currPath + filename;
        return fetcher
            .webOperation('PUT', fileUrl, {
                data: data,
                contentType: contentType,
            })
            .then((response) => {
                if (response.status === 201) {
                    console.log('Successfully uploaded!');
                }
            });
    };
    return new Promise(function(resolve, reject) {
        reader.readAsArrayBuffer(filePath);
    });
}

function isFolder(url) {
    if (url[url.length - 1] === '/') {
        return true;
    } else {
        return false;
    }
}

function getFolderUrl(folder) {
    const folderFile = folder.split('/');
    folderFile.pop();
    const folderUrl = folderFile.join('/');
    return folderUrl;
}

function deleteItems(items) {
    let deletions = [];
    if (Array.isArray(items)) {
        items.forEach((item) => {
            if (!isFolder(item)) {
                deletions.push(auth.fetch(item, { method: 'DELETE' }));
            } else {
                return getFolderTree(item).then((results) => {
                    console.log(results);
                    return Promise.all(
                        results.map((result, index) => {
                            if (index !== results.length) {
                                return auth.fetch(result, { method: 'DELETE' });
                            }
                        })
                    ).then(() => {
                        console.log(
                            'Delete root folder',
                            results[results.length - 1]
                        );
                        return auth
                            .fetch(results[results.length - 1], {
                                method: 'DELETE',
                            })
                            .then(() => {
                                window.location.href = window.location.href;
                            });
                    });
                });
            }
        });
    } else {
        deletions.push(auth.fetch(items, { method: 'DELETE' }));
    }

    return Promise.all(deletions);
}

function hasArray(fileList) {
    for (let i = 0; i < fileList.length; i++) {
        if (Array.isArray(fileList[i])) {
            return true;
        }
    }
    return false;
}

function getFolderTree(folderUrl) {
    return getFolderContents(folderUrl)
        .then((folder) => {
            const fileList = [];
            for (let i = 0; i < folder.length; i++) {
                if (isFolder(folder[i])) {
                    const subfolder = getFolderTree(folder[i]);
                    fileList.push(Promise.resolve(subfolder));
                } else {
                    fileList.push(
                        new Promise(function(resolve) {
                            resolve(folder[i]);
                        })
                    );
                }
            }
            const folderName = getFolderUrl(folderUrl);
            fileList.push(
                new Promise(function(resolve) {
                    resolve(folderName);
                })
            );
            return Promise.all(fileList);
        })
        .then(function(results) {
            while (hasArray(results)) {
                const nextResult = results.shift();
                if (Array.isArray(nextResult)) {
                    nextResult.forEach((result) => {
                        results.push(result);
                    });
                } else {
                    results.push(nextResult);
                }
            }
            return results.sort(sortByDepth).reverse();
        });
}

function sortByDepth(fileA, fileB) {
    const depthA = fileA.split('/').length;
    const depthB = fileB.split('/').length;

    return depthA - depthB;
}

function getFolderContents(folderUrl) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    return fetcher
        .load(folderUrl)
        .then(function() {
            const urls = [];
            const containments = store
                .each(rdf.sym(folderUrl), ns.ldp('contains'), undefined)
                .map((containment) => {
                    return containment.value;
                });
            return containments;
        })
        .catch((err) => {
            return [];
        });
}

function changeAccess(item) {
    console.log(item);
}

function getInfo(item) {
    console.log(item);
}

function renameFile(item) {
    console.log(item);
}

export default {
    uploadFile: uploadFile,
    getContentType: getContentType,
    getFolderContents: getFolderContents,
    getFolderTree: getFolderTree,
    uploadFolderOrFile: uploadFolderOrFile,
    deleteItems: deleteItems,
    changeAccess: changeAccess,
    getInfo: getInfo,
    renameFile: renameFile,
    hasArray: hasArray,
};
