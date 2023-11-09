# Fleet and vehicle Step2

## Requirements:
- **docker** :  you can install docker. [Check this tutorial for ubuntu](https://docs.docker.com/engine/install/ubuntu/) or [Check this tutorial for windows](https://docs.docker.com/docker-for-windows/install/).

## Steps:
### Run database: 
To persist fleet and vehicles into a real database, we have used a postgresSql database.

So we use docker postgres image and to run the postgres container we have to launch this command :
* docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=mydatabase -d -p 5432:5432 postgres

### Project structure:
This structure separates the domain entities, commands, queries, repositories and controllers.

It follows the DDD principles by encapsulating domain logic within the entities and using repositories to manage operation on objects. 

The CQRS pattern is applied by having separate command and query responsibilities.

### Run project and tests:
To run project, we need to have the container of database up, we have to launch this command :
* npm start

To run tests, we have to launch this command :
* npm test

### Use command line cli:
If you are using terminal on Windows, you can use the Invoke-WebRequest command.

If you are working in an Ubuntu environment or using Git Bash on Windows, you can use the curl command.

* To create fleet:
  * Invoke-WebRequest -Uri "http://localhost:3000/api/create" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"userId" : "<user_id>"}'

  example: Invoke-WebRequest -Uri "http://localhost:3000/api/create" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"userId" : "14"}'


* To register vehicle:
  * Invoke-WebRequest -Uri "http://localhost:3000/api/register-vehicle" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"fleetId": "<fleet_id>", "plateNumber": "<plate_number_id>"}'

  example: Invoke-WebRequest -Uri "http://localhost:3000/api/register-vehicle" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"fleetId": "87", "plateNumber": "ABC1234"}'


* To localize vehicle:
   * Invoke-WebRequest -Uri "http://localhost:3000/api/localize-vehicle" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"fleetId": "87", "plateNumber": "ABC123",  "location": {"latitude": 1.23, "longitude": <longitude>, "altitude": <altitude>}}'

  example: Invoke-WebRequest -Uri "http://localhost:3000/api/localize-vehicle" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"fleetId": "87", "plateNumber": "ABC123",  "location": {"latitude": 1.23, "longitude": 4.56, "altitude": 789}}'







