export const getBreadcrumbsFromUrl = (url) => {
    const breadcrumbs = url.replace('https://', '').split('/');
    breadcrumbs.shift();
    const newBreadcrumbs = ['/'];
    breadcrumbs.forEach((breadcrumb) => {
        newBreadcrumbs.push(breadcrumb + '/');
    });
    return newBreadcrumbs;
};
