import "reflect-metadata"
import {createConnection} from "typeorm";

import {Photo} from "./entity/Photo";
import {PhotoMetadata} from "./entity/PhotoMetadata"

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).then(async (connection) => {
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "This is saved by cascade option"
    photo.filename = "photo-with-bears.jpg";
    photo.isPublished = true;
    photo.views = 1;

    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";

    photo.metadata = metadata

    let photoRepository = connection.getRepository(Photo)
    const savedPhoto = await photoRepository.save(photo)

    console.log(savedPhoto);
}).catch((error) => console.log(error))

// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";
//
// createConnection().then(async connection => {
//
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);
//
//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);
//
//     console.log("Here you can setup and run express/koa/any other framework.");
//
// }).catch(error => console.log(error));
