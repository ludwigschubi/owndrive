import rdf from 'rdflib';
import auth from 'solid-auth-client';
import { folder } from '../assets/icons/externalIcons';

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
                }
            });
    };
    reader.readAsArrayBuffer(file);
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
        fetcher
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
    reader.readAsArrayBuffer(filePath);
}

function deleteItem(item) {
    console.log(item);
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
    uploadFolderOrFile: uploadFolderOrFile,
    deleteItem: deleteItem,
    changeAccess: changeAccess,
    getInfo: getInfo,
    renameFile: renameFile,
};
