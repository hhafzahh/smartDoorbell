// dependencies
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';


//get reference to Rekognition client
var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});

exports.handler =   (event, context, callback) => {
    
   //get S3 bucket name
   var docClient = new AWS.DynamoDB.DocumentClient();
    console.log(event)
    var srcBucket = event.Records[0].s3.bucket.name;
    var table = "faces_table"

    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    // Object key may have spaces or unicode non-ASCII characters.
    console.log(srcBucket)
    
    var collectionName = "houseowners";
    var isCollectionFound = false;  


    var paramsIndexFace = {
      CollectionId: collectionName, 
      DetectionAttributes: [
      ], 
      ExternalImageId: srcKey, 
      Image: {
       S3Object: {
        Bucket: srcBucket, 
        Name: srcKey
       }
      }
    };
 
    //fetch list of Rekognition collections
    var params = {
    }; 
    //list all collection in the account and check if a collection already exists with the name houseowners
    

    rekognition.listCollections(params, function(err, data) {
       if (err) { // an error occurred
            console.log(err, err.stack); 
            callback("Could not list collections");
            return;
        }
        else { // successful response
            if (data.CollectionIds.length > 0) {
               for (var i in data.CollectionIds) {
                   if (data.CollectionIds[i] == collectionName) {
                       isCollectionFound = true;
                       break;
                   }
               }
            } 
            
            //if the collection name is not found, create the collection.
            if (!isCollectionFound) {
                // create collection
                var paramsCreate = {
                  CollectionId: collectionName
                };
                // only done once 
                rekognition.createCollection(paramsCreate, function(err, dataCreate) {
                    if (err) {
                        console.log(err, err.stack);
                        callback("Could not create collection");
                        return; 
                    } 
                    else {
                        
                        
                            //index faces
                            rekognition.indexFaces(paramsIndexFace, function(err, dataIndex) {
                            if (err) {
                                    console.log(err, err.stack);
                                    callback("Could not index photo");
                                    return; 
                                } 
                            else {
                                     
                                    
                                     console.log(JSON.stringify(dataIndex));
                                     console.log(dataIndex);
                                        
                                    callback(null,"Created collection & indexed photo - done!");
                                    
                                }           
                        });
                    }
                });
            } else {
                
                
                    //index faces
                    rekognition.indexFaces(paramsIndexFace, function(err, dataIndex) {
                    if (err) {
                            console.log(err, err.stack);
                            callback("Could not index photo");
                            return; 
                        } 
                    else {
                    
                        
                    var paramsDB = {
                    TableName:table,
                        Item:{
                                    "faceID": dataIndex.FaceRecords[0].Face.FaceId,
                                    "information":dataIndex.FaceRecords[0].FaceDetail //raw response from detectFaces call
                                    
                                }
                     }
                docClient.put(paramsDB, function(err, rs) {
                if (err) {
                    console.log(err, err.stack);
                    callback('could not add to db');
                    return;
                } else {
                        
                      // var hello = JSON.stringify(dataIndex);
                       //console.log(hello)
                       //console.log(dataIndex.FaceRecords[0].Face.FaceId)
                       //console.log(dataIndex.FaceRecords[0].FaceDetail)
                        console.log(JSON.stringify(dataIndex));
                        callback(null,"Indexed photo - done!");
                    }           
                });
            }   
        });
    }
}
    
});
  
}