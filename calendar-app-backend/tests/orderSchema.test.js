// const db = require("./db");
import db from "./db";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await db.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await db.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await db.closeDatabase());

/**
 * Product test suite.
 */
describe("order create ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
});
