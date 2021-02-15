const { DataSource } = require('apollo-datasource');

class UserDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getUserWithFID(firebaseID){
        return this.dataBase.select('*').from("user").where("firebaseid",firebaseID).then(data => data[0])
    }

    getUserWithUID(userID){
        return this.dataBase.select('*').from("user").where("uid",userID).then(data => data[0])
    }

    getUserGroups(userID){
        return this.dataBase.select("group.*").from("group").innerJoin("user_group_member","group.gid","user_group_member.gid")
            .innerJoin('user','user_group_member.uid','user.uid')
            .where({'user.uid':userID})
            .then(data => data);

    }


    createUser(firebaseID,email){
        return this.dataBase.insert({firebaseid : firebaseID , email},['*']).into("user").then(data => data[0])
    }

    updateUser(firebaseID,newName,newSurname){
        if(newName === undefined || newSurname === undefined)
            return this.getUserWithFID(firebaseID)

        return this.dataBase("user").where({firebaseid:firebaseID}).update({name : newName,surname:newSurname},["*"])
            .then(data => data[0])
    }

    deleteUser(firebaseID){
        return this.dataBase("user").where({firebaseid : firebaseID}).del().then(data=>data)
    }

    getAllUsers(){
        return this.dataBase.select('*').from("user").then(data => data);
    }
}

module.exports = UserDatabaseDataSource;