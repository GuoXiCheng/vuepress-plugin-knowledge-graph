import { Page } from 'vuepress';
import { getDocNodes, getTempContent } from '../utils';
describe('getTempContent', () => {
  test('should return a string', () => {
    const detail = getTempContent({ name: "docNodes", value: "test string" });
    expect(detail).toEqual("export const docNodes = 'test string'");
  });

  test('should return object', () => {
    const detail = getTempContent({ name: "docLinks", value: { a: 1, b: 2 } });
    expect(detail).toEqual('export const docLinks = {"a":1,"b":2}');
  });

  test('other', () => {
    const detail = getTempContent({ name: "docLinks", value: true });
    expect(detail).toEqual('export const docLinks = true');
  });
});

describe('getDocNodes', () => {
  test('excludeReadme is true', () => {
    const detail = getDocNodes([{
      filePath: 'Readme.md',
    }, {
      filePath: 'D:/test/README.md'
    }, {
      filePath: 'D:/test/test.md'
    }] as Page[], { excludeReadme: true });
    expect(detail).toEqual([{ id: 'test', label: 'test' }]);
  });

  test('excludeReadme is not true', () => {
    const detail = getDocNodes([{
      filePath: 'Readme.md',
    }, {
      filePath: 'D:/test/README.md'
    }, {
      filePath: 'D:/test/test.md'
    }] as Page[], {});
    expect(detail).toEqual([{ id: 'README', label: 'README' }, { id: 'test', label: 'test' }])
  });

  test('only markdown', () => {
    const detail = getDocNodes([{
      filePath: 'D:/test/test/test.md',
    }, {
      filePath: 'D:/test/test.js'
    }, {
      filePath: 'D:/test/test.ts'
    }] as Page[], {});
    expect(detail).toEqual([{ id: 'test', label: 'test' }]);
  });

  test('exclude', () => {
    const detail = getDocNodes([{
      filePath: 'D:/guide/test/test1.md',
    }, {
      filePath: 'D:/demo/text2.md'
    }, {
      filePath: 'D:/test/test3.md'
    }] as Page[], { exclude: ['test'] });
    expect(detail).toEqual([{ id: 'text2', label: 'text2' }])
  });

  test('exclude and include', () => {
    const detail = getDocNodes([{
      filePath: 'demo/text1.md',
    }, {
      filePath: 'demo/text2.md'
    }, {
      filePath: 'test/test3.md'
    }] as Page[], { exclude: ['test', 'demo'], include: ['demo/text1.md'] });
    expect(detail).toEqual([{ id: 'text1', label: 'text1' }])
  });
});