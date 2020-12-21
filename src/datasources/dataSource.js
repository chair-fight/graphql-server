const testData = require("./TestData")
const { DataSource } = require('apollo-datasource');

class dataSource extends DataSource{
    constructor() {
        super();
        this.TestData = testData;
    }

    getAllGroups(){
        return Object.values(this.TestData["Groups"],);
    }

    getAllUsers(){
        console.log(Object.values(this.TestData["Users"]));
        return Object.values(this.TestData["Users"]);
    }
}

module.exports = dataSource;