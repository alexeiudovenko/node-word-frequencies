### Prerequsites
You need node.js (version preferably LTS version), npm or yarn to be installed

### Steps to reproduce locally

1.  *yarn install* or *npm install*
2.  Then run *yarn dev* or *npm run dev*
3. Create .env (*touch .env*) file, and move all data from .envExample to .env file (*cat .envExample >> .env*)
4. By default, the server will run at a port 3000, but you can change default port in env file

### Running tests

*yarn test* or *npm run test*. Since in the test files you need to create a large file (approximately 1.3GB) and process the data from it, running tests may take some time (generally 1-2 min).

### Table which shows singe endpoint

| Endpoints | Function | Body |  
|-----------|:-----------:|-----------:|  
| /api/word-frequencies | POST | form-data, {"key": "value", "file": "file.txt"} |  

This endpoint is used to compute the top N most frequent words in a .txt file. All requirements were taken into account.

Below, you can see a particular request (*/api/word-frequencies*) made in Postman program.
 ![POST request to the node.js server](https://i.ibb.co/RPrgdz0/image.png)