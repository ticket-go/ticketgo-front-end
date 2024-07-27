import "@testing-library/jest-dom";

Object.defineProperty(global, "fetch", {
  value: jest.fn(),
});
