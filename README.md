# Smart Doorbell
A simple but yet comprehensive web application that works like a doorbell but when capturing the image through hardware camera,  you need to upload your image to check.

## Features 
The Camera Doorbell Surveillance Solution helps to capture  images of the person standing at the doorstep when visiting a house. When the person clicks the smart doorbell, a picture is captured and will see if the person exists in the user dashboard data. A SNS email notification is sent to the owner of the house if the intruder is a Known or Unknown person and image of the person.

1. Sign Up  or Search face as an owner using upload image button or Search Button 
2. Lambda Function to invoke the search faces function or index faces function to create faceID or search a faceId
3. Return similar face result when search face function is invoked
4. Using the faceID, use the check_face to see if face exists and send SNS notification to house owner

## AWS IOT Architecture

![iotArchitecture_smartDoorbell](https://user-images.githubusercontent.com/94510297/161058234-5ae4a04f-1c2e-4b98-95db-4e362e435363.png)

## Services Used
- AWS Lambda
- AWS Iot Core
- AWS DynamoDB
- AWS SNS
- AWS Amazon S3 Bucket
- AWS Api Gateway
- AWS CloudWatch Log
- AWS Rekognition 
- AWS Amazon Cognito

# How would the website look
