const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ihi0.mongodb.net/delish2go?retryWrites=true&w=majority`;
let db = null;

const ORDER_STATUS = { PENDING:1, ACCEPTED:2, PREPARED:3, OUT_FOR_DELIVERY:4, DELIVERED:5 }

const init = ()=>{

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        db = client.db("delish2go");//.collection("city");
        // perform actions on the collection object
        console.log("db connected");
        // client.close();
    });
      
};

const put = (collec, data)=>{
    const collection = db.collection(collec);
    return collection.insertOne(data).then(res=>{
        console.log("inserted data id: ", res.insertedId);
        return 0;
    }).catch(err=>{
        console.log("Failed to insert ", err);
        return 1;
    });
};

const  get =  (collec, query, fields)=>{
    const collection = db.collection(collec);

    return  fields ? collection.find(query, fields) : collection.find(query);  
};

const deleteOne = (collec, data)=>{
    const collection = db.collection(collec);
    return collection.deleteOne(data).then(res=>{
        console.log("deleted data id: ", res.deletedCount);
        return 0;
    }).catch(err=>{
        console.log("Failed to deleted ", err);
        return 1;
    });
};

const update = (collec, query, data)=>{
    const collection = db.collection(collec);

    return collection.updateOne(query, {$set:data}).then(res=>{
        console.log(res.matchedCount," data updated: ");
        if(res.matchedCount==1)
            return 0;
        return 2;
    }).catch(err=>{
        console.log("Failed to update ", err);
        return 1;
    });
};

const updateArray = (collec, query, data_operation)=>{
    const collection = db.collection(collec);

    return collection.updateOne(query, data_operation).then(res=>{
        console.log(res.matchedCount," data updated: ");
        if(res.matchedCount==1)
            return 0;
        return 2;
    }).catch(err=>{
        console.log("Failed to update ", err);
        return 1;
    });
};

module.exports ={
    RESTAURANT:'restaurant',
    CITY:'city',
    DISH:'dish',
    ORDER:'order',
    DELIVERY_PERSONNEL: 'delivery_personnel',
    ORDER_STATUS: ORDER_STATUS,
    default: init,
    put: put,
    get: get,
    update: update,
    updateArray: updateArray,
    deleteOne: deleteOne
};
// export default mongo;