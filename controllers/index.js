const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllCows = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('cows').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  } catch (error) {
    console.error(error);
  }
};

//get 1 cow where id matches id in query 
const getOneCow = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('cows').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]); 
    });
  } catch (error) {
    console.error(error);
  }
};

//create new cow
const createNewCow = async (req, res, next) => {
  try {
    const cow = {
      tag : req.body.tag,
      calfTag : req.body.calfTag,
      color : req.body.color,
      birthday : req.body.birthday,
      lostCalves : req.body.lostCalves,
      lateCalves : req.body.lateCalves,
      antibiotics : req.body.antibiotics
    };
    const response = await mongodb.getDb().db().collection('cows').insertOne(cow);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error: problem with new cow.');
    };
  } catch (error) {
    console.error(error);
  }
}

//update 1 cow where id matches id in query 
const updateCow = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const cow = {
      tag : req.body.tag,
      calfTag : req.body.calfTag,
      color : req.body.color,
      birthday : req.body.birthday,
      lostCalves : req.body.lostCalves,
      lateCalves : req.body.lateCalves,
      antibiotics : req.body.antibiotics
    };
    const response = await mongodb.getDb().db().collection('cows').replaceOne({ _id: userId }, cow);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Error: problem with updating cow.');
    };
  } catch (error) {
    console.error(error);
  }
}

//delete 1 cow where id matches id in query 
const deleteCow = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cows').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || 'Error: cow was not deleted.');
    };
  } catch (error) {
    console.error(error);
  }
};

const getAllCalves = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('calves').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  } catch (error) {
    console.error(error);
  }
};

//get 1 calf where id matches id in query 
const getOneCalf = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('calves').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]); 
    });
  } catch (error) {
    console.error(error);
  }
};

//create new calf
const createNewCalf = async (req, res, next) => {
  try {
    const calf = {
      tag : req.body.tag,
      color : req.body.color,
      birthday : req.body.birthday,
      sex : req.body.sex,
      birthType : req.body.birthType,
      birthWeight : req.body.birthWeight,
      antibiotics : req.body.antibiotics
    };
    const response = await mongodb.getDb().db().collection('calves').insertOne(calf);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error: problem with new calf.');
    };
  } catch (error) {
    console.error(error);
  }
}

//update 1 calf where id matches id in query 
const updateCalf = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const calf = {
      tag : req.body.tag,
      color : req.body.color,
      birthday : req.body.birthday,
      sex : req.body.sex,
      birthType : req.body.birthType,
      birthWeight : req.body.birthWeight,
      antibiotics : req.body.antibiotics
    };
    const response = await mongodb.getDb().db().collection('calves').replaceOne({ _id: userId }, calf);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'Error: problem with updating calf.');
    };
  } catch (error) {
    console.error(error);
  }
}

//delete 1 calf where id matches id in query 
const deleteCalf = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('calves').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || 'Error: calf was not deleted.');
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllCows, getOneCow, createNewCow, updateCow, deleteCow, getAllCalves, getOneCalf, createNewCalf, updateCalf, deleteCalf };