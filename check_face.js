


var AWS = require('aws-sdk');

var iotdata = new AWS.IotData({endpoint:"Your endpoint"});

var docClient = new AWS.DynamoDB.DocumentClient();
var db = new AWS.DynamoDB();

//get reference to Rekognition client
var rekognition = new AWS.Rekognition();

var tableName = "faces_table";

exports.handler = async (event, context) => {
   const params1 = {
            TableName: tableName,
            Key:
            {
                faceID: event.faceID
            }
        }
  
        var exists = false
        var result = await docClient.get(params1).promise();
        
        console.log(result)
        if (result.Item == undefined || result.Item == null) {
        
           
            var postData = JSON.stringify({"message":"false"});
            var params = {
            topic:'topic_3',
            payload: postData,
            qos:0
            };
            //console.log
            iotdata.publish(params, function(err, data){
                if(err){ console.log("error occured:", err);
            }
            else
            {   
                console.log("success");
                
            }
            });
            
        }
        else{
          exists = true
           var postData = JSON.stringify({"message":exists});
            var params = {
            topic:'topic_3',
            payload: postData,
            qos:0
            };
            //console.log
            iotdata.publish(params, function(err, data){
                if(err){ console.log("error occured:", err);
            }
            else
            {   
                console.log("success");
                
            }
            });
        }
        
        
        

       return (exists)
        



}