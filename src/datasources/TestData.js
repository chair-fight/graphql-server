
const testData = {
    "Users" : {
        1 : {
            "ID" : 1,
            "Name" : "Andrei",
            "Surname" : "Mihai",
            "Password" : "123",
            "University" : "UBB"
        },
        2 : {
            "ID" : 2,
            "Name" : "Darius",
            "Password" : "123",
            "Surname" : "Calugar"
        },
        3 : {
            "ID" : 3,
            "Name" : "Andrei",
            "Password" : "123",
            "Surname" : "Barzu"
        }
    },
    "Groups" : {
        1 : {
            "ID" : 1,
            "Name" : "916",
            "NumberOfMembers" : 1,
            "AdminUsers" : [1],
            "Users" : []
        },
        2 : {
            "ID" : 2,
            "Name" : "913",
            "NumberOfMembers" : 2,
            "AdminUsers" : [2],
            "Users" : [3]
        },
    }
}

module.exports = testData;