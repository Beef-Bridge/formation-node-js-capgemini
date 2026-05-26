import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    environmentMatchGlobs: [
      [
        'tests/*/*.test.[c|m]js',
        'tests/*/*integration*.test.{js,mjs,cjs,ts}',
        'node',
      ]
    ],
    exclude: ['exercices', 'cypress', 'node_modules', 'demos', '0-admin', 'tests/v*']
  }
})
