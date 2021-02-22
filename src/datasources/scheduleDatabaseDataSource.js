const { DataSource } = require('apollo-datasource');

class ScheduleDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getSchedulePrivateOfUser(uid){
        return this.dataBase.select('spid','name','uid').from('schedule_private')
            .where({uid}).then(data=>data);
    }

    addSchedulePrivateToUser(name, uid) {
        return this.dataBase.insert({name,uid}).into('schedule_private')
            .then(data => true).catch(err => false);
    }

}

module.exports = ScheduleDatabaseDataSource;