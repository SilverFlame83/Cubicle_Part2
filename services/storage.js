const Cube = require('../models/Cube');

async function init() {
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create
        };
        next();
    };
}

async function getAll(query) {
    const options = {};
    
    // //filter cubes by query params
    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }
    if (query.from) {
        options.difficulty = {$gte: Number(query.from)}
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$gte = Number(query.to);
    }

    const cubes = Cube.find(options).lean();
    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id).lean();
    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube) {
    const record = new Cube(cube);
    return record.save();
    // try{
    //     await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    // } catch(err){
    //     console.error('Error writing out database')
    // }
}

module.exports = {
    init,
    getAll,
    getById,
    create
}