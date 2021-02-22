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

    createGroup(uid,name){
        return this.dataBase.transaction(trx => {

            return trx
                .insert({uid ,name},['gid']).into("group")
                .then(data => {
                    const gid = data[0].gid;
                    return trx.insert({gid,uid,'isadmin' : true}).into('user_group_member')
                });
            })
            .then(function(inserts) {
                return true;
            })
            .catch(function(error) {
                // If we get here, that means that neither the 'Old Books' catalogues insert,
                // nor any of the books inserts will have taken place.
                console.error(error);
                return false;
            });
    }

    updateGroup(groupID,newName,newDescription){

        return this.dataBase("group").where({'gid':groupID}).update({name : newName,description:newDescription},["*"])
            .then(data => data[0])
    }

    async addUserToGroup(groupID,uid){
        const gid = groupID;

        const isAlreadyInGroup = await this.dataBase.count({amount : 'uid'}).from('user_group_member')
            .where({"gid":groupID,'uid' : uid}).then(data => data[0].amount)

        if(isAlreadyInGroup != 0) {
            return false;
        }

        return this.dataBase.insert({gid,uid}).into('user_group_member')
            .then(data => true)
    }



}

module.exports = GroupDatabaseDataSource;