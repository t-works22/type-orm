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
    photo.name = "Test name";
    photo.description = "Test description";
    photo.filename = 'test-filename.jpg';
    photo.views = 1;
    photo.isPublished = true;

    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";
    metadata.photo = photo;

    const photoRepository = connection.getRepository(Photo);
    const metadataRepository = connection.getRepository(PhotoMetadata)

    await photoRepository.save(photo);
    await metadataRepository.save(metadata);

    console.log("Metadata is saved, and relation between metadata and photo is created in the database too");
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
