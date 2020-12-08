

const data = {
    "Users" : {
        1 : {
            "Name" : "Andrei",
            "Surname" : "Mihai",
            "University" : "UBB"
        },
        2 : {
            "Name" : "Darius",
            "Surname" : "Calugar"
        },
        3 : {
            "Name" : "Andrei",
            "Surname" : "Barzu"
        }
    },
    "Groups" : {
        1 : {
            "Name" : "916",
            "NumberOfMembers" : 1,
            "AdminUsers" : [1],
            "Users" : []
        },
        2 : {
            "Name" : "913",
            "NumberOfMembers" : 2,
            "AdminUsers" : [2],
            "Users" : [3]
        },
    }
}

module.exports = data;