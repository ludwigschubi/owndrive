export const getBreadcrumbsFromUrl = (url) => {
    return url.replace('https://', '').split('/');
};
