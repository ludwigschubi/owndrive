import rdf from 'rdflib';

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

export default { uploadFile: uploadFile, getContentType: getContentType };
