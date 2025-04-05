import { User } from "../models/user.js";
import { faker} from '@faker-js/faker'


const createUser = async(numUsers) =>{
    try {

        const userPromise = [];

        for (let i = 0; i < numUsers; i++){
            const temp = User.create({                     // we don't add the await here because we push promise in array and resolve all
                name : faker.person.firstName(),
                username : faker.internet.username(),
                bio : faker.lorem.sentence(10),
                password : "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName(),
                  },
            })
            userPromise.push(temp);
        }
        await Promise.all(userPromise);

        console.log("Users created", numUsers);
        process.exit(1);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

export {
    createUser
}