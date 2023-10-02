/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/node/knowledge-graph-plugin.ts'], // 包括 src 目录及其子目录下的所有 .ts 文件
};