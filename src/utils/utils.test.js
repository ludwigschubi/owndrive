import { getBreadcrumbsFromUrl } from './url';

describe('Testing util functions', () => {
    describe('Testing url functions', () => {
        const url = 'https://www.heise.de/newsticker/it/';
        const emptyUrl = '';
        const invalidUrl = 'ich bin keine url';

        test('test getBreadcrumbsfromURL(url) should return Breadcrumbs as array', () => {
            expect(JSON.stringify(getBreadcrumbsFromUrl(url))).toBe(
                JSON.stringify(['/', '/newsticker', '/it'])
            );
        });

        test('test getBreadcrumbsfromURL(url="") should return empty array', () => {
            expect(() => getBreadcrumbsFromUrl(emptyUrl)).toThrow();
        });

        test('test getBreadcrumbsfromURL(url=invalidUrl) should return error', () => {
            expect(() => getBreadcrumbsFromUrl(invalidUrl)).toThrow();
        });
    });
});
