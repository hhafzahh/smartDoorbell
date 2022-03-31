
    var awsIot = require('aws-iot-device-sdk');
 

    var device = awsIot.device({
        keyPath: './certs/private.pem.key',
        certPath: './certs/certificate.pem.crt',
        //certificate authority path..
        caPath: './certs/AmazonRootCA1.pem',
        clientId: 'doorbel',//clientId can be anything..
        host:'a2ike5rb5c9n13-ats.iot.us-east-1.amazonaws.com'
    
    });


    device.on('connect',function(){
        console.log('connect');
        device.subscribe('topic_3');
        
        //topic_1 just like a keyword or like a discord channell name, subscribe to it.
        //if you subscribe on the MQTT test_client with the topic , then only the aws can receive ur json message!

        device.publish('topic_3',JSON.stringify({
            faceID: "428b7cd3-182f-4232-b351-a51ac762c4ce"
          
        }));
           
    });
    //to receive message from the test client 
    //when client publish message, this function receives the message from the cmd.
    device.on('message',function(topic,payload){
        console.log('message: ', topic , payload.toString());
        
    });



  
