const { DataSource } = require('apollo-datasource');

class GroupDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getGroup(groupID){
        return this.dataBase.select('*').from("group").where("gid",groupID).then(data => data[0])
    }

    getAllGroups(){
        return this.dataBase.select('*').from("group").then(data => data);
    }

    getNumberOfMembersOfGroup(groupID){
        return this.dataBase.count('*',{as : 'numberOfMembers'})
            .from("group")
            .innerJoin('user_group_member','group.gid','user_group_member.gid')
            .where({"group.gid":groupID})
            .then(data => parseInt(data[0].numberOfMembers))
    }

    getGroupUsers(groupID){
        return this.dataBase.select("user.*").from("user").innerJoin("user_group_member","user.uid","user_group_member.uid")
            .innerJoin('group','user_group_member.gid','group.gid')
            .where({'group.gid':groupID,'user_group_member.isadmin':false})
            .then(data=>data);
    }

    getGroupAdmins(groupID){
        return this.dataBase.select("user.*").from("user").innerJoin("user_group_member","user.uid","user_group_member.uid")
            .innerJoin('group','user_group_member.gid','group.gid')
            .where({'group.gid':groupID,'user_group_member.isadmin':true})
            .then(data=>data);
    }

    createGroup(firebaseID,email){
        return this.dataBase.insert({firebaseid : firebaseID , email},['*']).into("user").then(data => data[0])
    }

    updateGroup(firebaseID,newName,newSurname){
        console.log("Updating user" + firebaseID + newName + newSurname);
        if(newName === undefined || newSurname === undefined)
            return this.getUser(firebaseID)

        return this.dataBase("user").where({firebaseid:firebaseID}).update({name : newName,surname:newSurname},["*"])
            .then(data => data[0])
    }

    deleteGroup(firebaseID){
        return this.dataBase("user").where({firebaseid : firebaseID}).del().then(data=>data)
    }


}

module.exports = GroupDatabaseDataSource;