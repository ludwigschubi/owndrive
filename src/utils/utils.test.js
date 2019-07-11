import { getBreadcrumbsFromUrl } from './url';

test('test get Breadcrumbs from URL should return Breadcrumbs as array', () => {
    const url = 'https://www.heise.de/newsticker/it/';
    expect(JSON.stringify(getBreadcrumbsFromUrl(url))).toBe(
        JSON.stringify(['/newsticker', '/it'])
    );
});
