import request from "supertest";
import path from "path";
import fs from "fs";

import app from "../index";

jest.setTimeout(2000000);

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

  it("process very big file with N = 4", (done: jest.DoneCallback) => {
    const filePath = path.resolve(__dirname, "../data/big.txt");
    const data = fs.readFileSync(
      path.resolve(__dirname, "../data/medium.txt"),
      "utf8"
    );

    fs.writeFileSync(filePath, data.repeat(1));

    for (let i = 0; i < 150; i++) {
      fs.appendFileSync(filePath, data.repeat(2));
    }

    request(app)
      .post("/api/word-frequencies")
      .field("count", "4") //adds a field 'name' and sets its value to 'Logo'
      .attach("file", filePath) // attaches the file to the form
      .then((response) => {
        // response from the server
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchInlineSnapshot(`
Array [
  Object {
    "count": 4566341,
    "word": "sed",
  },
  Object {
    "count": 3805282,
    "word": "id",
  },
  Object {
    "count": 3044226,
    "word": "ut",
  },
  Object {
    "count": 3044226,
    "word": "sit",
  },
]
`);
        done();
      });
  });
});
