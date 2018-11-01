//Work will get the lens recommendations for the user.
//input is the amount of likes for each category and the mount the user uses
//output will be the best 10 lenses for the user
//5 budget lens and 5 best lenses
const LensAPI = require('../example_data_server/apiLenses');
let mount = 1; //Canon EF FF mount
let affinities = [
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 3,
        "liked": false
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 2,
        "liked": true
    },
    {
        "category": 2,
        "liked": true
    },
    {
        "category": 2,
        "liked": true
    },
    {
        "category": 2,
        "liked": true
    },
    {
        "category": 4,
        "liked": true
    },
    {
        "category": 4,
        "liked": true
    },
    {
        "category": 4,
        "liked": true
    },
    {
        "category": 4,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 3,
        "liked": true
    },
    {
        "category": 2,
        "liked": false
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": false
    },
    {
        "category": 1,
        "liked": true
    },
    {
        "category": 1,
        "liked": false
    }
]

const getRecommendations = (mount, affinityArray) => {
    //console.log(LensAPI['Canon']['EF Mount']['Portrait']['Low'][0]['Name']); // returns Canon 85mm F1.2 II USM 
    let consolidatedData = affinityArray.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = {
                'liked' : 0,
                'disliked' : 0
            };
        }
        curr.liked? acc[curr.category].liked += 1 : acc[curr.category].disliked += 1;
        return acc;
    }, {});
    console.log(consolidatedData);
    
}

getRecommendations(1, affinities);