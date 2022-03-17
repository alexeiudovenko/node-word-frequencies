import { countWordsAlgo } from "../utils/wordsAlgorithm";
import request from "supertest";
import path from "path";
import app from "../index";

describe("WordFrequencies controller functionality", () => {
  it("process small file with N = 3", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/word-frequencies")
      .field("count", "3") //adds a field 'name' and sets its value to 'Logo'
      .attach("file", path.resolve(__dirname, "../data/small.txt")) // attaches the file to the form
      .then((response) => {
        // response from the server
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchInlineSnapshot(`
Array [
  Object {
    "count": 12,
    "word": "sed",
  },
  Object {
    "count": 10,
    "word": "id",
  },
  Object {
    "count": 8,
    "word": "sit",
  },
]
`);
        done();
      });
  });

  it("process medium file with N = 8", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/word-frequencies")
      .field("count", "8") //adds a field 'name' and sets its value to 'Logo'
      .attach("file", path.resolve(__dirname, "../data/medium.txt")) // attaches the file to the form
      .then((response) => {
        // response from the server
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchInlineSnapshot(`
Array [
  Object {
    "count": 18816,
    "word": "sed",
  },
  Object {
    "count": 15680,
    "word": "id",
  },
  Object {
    "count": 12544,
    "word": "sit",
  },
  Object {
    "count": 12544,
    "word": "amet",
  },
  Object {
    "count": 12544,
    "word": "ut",
  },
  Object {
    "count": 10976,
    "word": "in",
  },
  Object {
    "count": 10976,
    "word": "at",
  },
  Object {
    "count": 10976,
    "word": "ac",
  },
]
`);
        done();
      });
  });
});
