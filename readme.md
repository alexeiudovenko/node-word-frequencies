### Prerequsites
You need node.js (preferably LTS version and at least Node.js ≥ v10.5.0), npm or yarn to be installed

### Steps to reproduce locally

1.  *yarn install* or *npm install*
2.  Then run *yarn dev* or *npm run dev*
3. Create .env (*touch .env*) file, and move all data from .envExample to .env file (*cat .envExample >> .env*)
4. By default, the server will run at a port 3000, but you can change default port in env file

### Steps to reproduce production-ready

1. Create .env (*touch .env*) file, and move all data from .envExample to .env file (*cat .envExample >> .env*)
2. *yarn build* or *npm run build*
3. cd ./dist
4. Then run node index.js
5. By default, the server will run at a port 3000, but you can change default port in env file (step 1)

### Running tests

*yarn test* or *npm run test*. Since in the test files you need to create a large file (approximately 1.3GB) and process the data from it, running tests may take some time (generally 15-20s).

### Table which shows singe endpoint

| Endpoints | Function | Body |  
|-----------|:-----------:|-----------:|  
| /api/word-frequencies | POST | form-data, {"key": "value", "file": "file.txt"} |  

This endpoint is used to compute the top N most frequent words in a .txt file. All requirements were taken into account.

Below, you can see a particular request (*/api/word-frequencies*) made in Postman program.
 ![POST request to the node.js server](https://i.ibb.co/RPrgdz0/image.png)