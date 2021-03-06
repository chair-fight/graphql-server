const { DataSource } = require('apollo-datasource');

class UserDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getUserWithFID(firebaseID){
        return this.dataBase.select('*','dateofcreation as dateOfCreation').from("user").where("firebaseid",firebaseID).then(data => data[0])
    }

    getUserWithUID(uid){
        return this.dataBase.select('*','dateofcreation as dateOfCreation').from("user").where({uid}).then(data => data[0])
    }

    getUserGroups(uid){
        return this.dataBase.select("group.*").from("group").innerJoin("user_group_member","group.gid","user_group_member.gid")
            .innerJoin('user','user_group_member.uid','user.uid')
            .where({'user.uid' : uid})
            .then(data => data);

    }


    createUser(firebaseID,email){
        return this.dataBase.insert({'firebaseid' : firebaseID , email}).into("user").then(data =>  true).catch(err => false);
    }

    updateUser(uid,newName,newSurname){
        if(newName === undefined || newSurname === undefined)
            return this.getUserWithUID(uid)

        return this.dataBase("user").where({uid}).update({name : newName,surname:newSurname},["*"])
            .then(data => data[0])
    }

    deleteUser(uid){
        return this.dataBase("user").where({uid}).del().then(data=>data)
    }

    getAllUsers(){
        return this.dataBase.select('*','dateofcreation as dateOfCreation').from("user").then(data => data);
    }

    getLabelsOfUser(uid){
        return this.dataBase.select('label_private.name','label_private.color','label_private.lpid as lid').from('label_private')
            .innerJoin('user','user.uid','label_private.uid')
            .where({"user.uid":uid}).then(data => data);
    }

    addLabelForUser(name,color,uid){
        return this.dataBase.insert({name,color,uid},['lpid']).into('label_private').then(data=>data);
    }
}

module.exports = UserDatabaseDataSource;