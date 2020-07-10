module.exports = {
  "testTimeout": 60*1000,
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "src/**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
