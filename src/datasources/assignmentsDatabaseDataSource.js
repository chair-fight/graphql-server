const { DataSource } = require('apollo-datasource');

class AssignmentsDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getAssignmentsGroupForUser(uid){
        return this.dataBase.select('assignment_group.name'
            ,'assignment_group.agid'
            ,'assignment_group.gid'
            ,'user_assignment_shared.isfinished as isFinished'
            ,'user_assignment_shared.needhelp as needHelp','assignment_group.duedate as dueDate')
            .from('user')
            .innerJoin('user_assignment_shared','user.uid','user_assignment_shared.uid')
            .innerJoin('assignment_group','user_assignment_shared.agid','assignment_group.agid')
            .where({"user.uid":uid}).then(data => data)
    }

    getAssignmentsGroupForGroup(gid){
        return this.dataBase.select('assignment_group.name'
            ,'assignment_group.agid'
            ,'assignment_group.gid'
            ,'assignment_group.duedate as dueDate')
            .from('group')
            .innerJoin('assignment_group','group.gid','assignment_group.gid')
            .where({'group.gid' : gid})
            .then(data=>data)

    }


    addAssignmentGroup(gid,name,dueDate){
        return this.dataBase('assignment_group').insert({gid,name,'duedate':dueDate},['agid']).then(data=>data[0].agid);
    }

    addAssignmentPrivate(uid,name,dueDate){
        return this.dataBase('assignment_private').insert({uid,name,'duedate':dueDate},['apid']).then(data=>data[0].apid);
    }

    getAssignmentsPrivateForUser(uid){
        return this.dataBase.select('apid','name','duedate as dueDate','isfinished as isFinished')
            .from('assignment_private').where({uid}).then(data => data);
    }
}



module.exports = AssignmentsDatabaseDataSource;