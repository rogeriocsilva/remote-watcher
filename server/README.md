
## bash into docker image

docker-compose exec server /bin/sh


## generate new model
    docker-compose exec server  sequelize model:generate --name User --attributes username:string,email:string,password:string


## migrate 
    docker-compose exec server sequelize db:migrate
