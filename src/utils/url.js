export const getBreadcrumbsFromUrl = (url) => {
    const breadcrumbs = url.replace('https://', '').split('/');
    breadcrumbs.shift();
    const newBreadcrumbs = ['/'];
    breadcrumbs.forEach((breadcrumb) => {
        newBreadcrumbs.push(breadcrumb + '/');
    });
    return newBreadcrumbs;
};

// sorts files and folder
export const sortContainments = (urls) => {
    const folders = [];
    const files = [];
    urls.forEach((url) => {
        if (url.value[url.value.length - 1] === '/') {
            const urlFragments = url.value.split('/');
            const folderUrl = urlFragments[urlFragments.length - 2];
            folders.push(decodeURIComponent(folderUrl));
        } else {
            const urlFragments = url.value.split('/');
            const fileUrl = urlFragments[urlFragments.length - 1];
            files.push(decodeURIComponent(fileUrl));
        }
    });
    return [files, folders];
};

// converts webId into url to fetch folders
export const getUrlFromWebId = (webId) => {
    return 'https://' + webId.split('/')[2] + '/';
};

// add a breadcrumb to url
export const addToUrl = (baseUrl, breadcrumb) => {
    return baseUrl + breadcrumb;
};

// removes the last element of an url
export const removeFromUrl = (url) => {
    return url.split('/').slice(0, -1);
};
