import { getTempContent } from '../utils';
describe('getTempContent', () => {
  test('should return a string', () => {
    const detail = getTempContent({ name: "docNodes", value: "test string" });
    expect(detail).toEqual("export const docNodes = 'test string'");
  });

  test('should return object', () => {
    const detail = getTempContent({ name: "docLinks", value: { a: 1, b: 2 } });
    expect(detail).toEqual('export const docLinks = {"a":1,"b":2}');
  });

  test('other', ()=>{
    const detail = getTempContent({ name: "docLinks", value: true});
    expect(detail).toEqual('export const docLinks = true');
  });
});
