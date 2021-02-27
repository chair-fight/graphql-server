const { DataSource } = require('apollo-datasource');
const _ = require('lodash')

class ScheduleDatabaseDataSource extends DataSource{
    constructor(dataBase) {
        super();
        this.dataBase = dataBase;
    }

    getLabelForScheduleEntryPrivate(lpid){
        return this.dataBase.select('*','lpid as lid').from('label_private').where({lpid}).then(data => data[0]);
    }

    getLabelForScheduleEntryGroup(lgid){
        return this.dataBase.select('*','lgid as lid').from('label_group').where({lgid}).then(data => data[0]);
    }

    getSchedulePrivateOfUser(uid){
        return this.dataBase.select('spid','name','uid').from('schedule_private')
            .where({uid}).then(data=>data);
    }

    addSchedulePrivateToUser(name, uid) {
        return this.dataBase.insert({name,uid}).into('schedule_private')
            .then(data => true).catch(err => false);
    }

    getScheduleEntryPrivateForSchedulePrivate(spid){
        return this.dataBase.select('*','starttime as startTime','weekday as weekDay').from('schedule_entry_private').where({spid})
            .then(data => data);

    }

    addScheduleEntryPrivate(name,weekDay,startTime,duration,spid){
        return this.dataBase.insert({name,'weekday':weekDay,'starttime':startTime,duration,spid})
            .into('schedule_entry_private').then(data => true)
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    addLabelToScheduleEntryPrivate(lpid,sepid){
        return this.dataBase('schedule_entry_private').update({lpid}).where({sepid}).then(data => true)
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    addLabelToScheduleEntryGroup(lgid,segid){
        return this.dataBase('schedule_entry_group').update({lgid}).where({segid}).then(data => true)
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    addScheduleGroupToGroup(name,gid){
        return this.dataBase.insert({name,gid}).into('schedule_group')
            .then(data => true).catch(err => false);
    }

    getScheduleGroupOfGroup(gid){
        return this.dataBase.select('*').from('schedule_group')
            .where({gid}).then(data => data);
    }

    addScheduleGroupToUser(sgid,uid){
        return this.dataBase.insert({sgid,uid}).into('user_schedule_shared')
            .then(data => true);
    }

    getScheduleGroupOfUser(uid){
        return this.dataBase.select('schedule_group.sgid','schedule_group.name','schedule_group.gid').from('schedule_group')
            .innerJoin("user_schedule_shared",'schedule_group.sgid','user_schedule_shared.sgid')
            .where({uid}).then(data => data);
    }

    addScheduleEntryGroup(name,weekDay,startTime,duration,sgid){
        return this.dataBase.insert({name,'weekday':weekDay,'starttime':startTime,duration,sgid})
            .into('schedule_entry_group').then(data => true)
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    getScheduleEntryGroupForScheduleGroup(sgid){
        return this.dataBase.select('*','starttime as startTime','weekday as weekDay').from('schedule_entry_group').where({sgid})
            .then(data => data);
    }

}

module.exports = ScheduleDatabaseDataSource;