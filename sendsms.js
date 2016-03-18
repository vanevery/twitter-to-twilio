var twilio = require('twilio');
var twitter = require('twitter')
var http = require("http");
var fs = require('fs');
var request = require('request');

var tags = ['#tag1', '#tag2', '#tag3'];
var phonenumbers = ['+12125551212'];

var twilio_client = new twilio.RestClient('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

var twitter_client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

searchTweets();

function searchTweets(){
	twitter_client.stream('statuses/filter', {track: tags[0]}, 
		function(stream) {
  			stream.on('data', function(tweet) {
    				//console.log(tweet);
				
				if (tweet.text.indexOf(tag[1]) != -1 && tweet.text.indexOf(tag[2]) != -1) 
				{
					console.log("Send SMS: " + tweet.text);
					sendSMS(tweet.text);
				}
  			});
 
  			stream.on('error', function(error) {
    				throw error;
  			});
		}
	);
}

//to:'+17188096659'

function sendSMS(tweet) {

for (var i = 0; i < phonenumbers.length; i++) {
		twilio_client.sms.messages.create({
    			to: phonenumbers[i],
    			from: '+12125551212',
    			body: tweet
		}, function(error, message) {
    			if (!error) {
        			console.log('Success! The SID for this SMS message is:');
        			console.log(message.sid);
 
        			console.log('Message sent on:');
        			console.log(message.dateCreated);
    			} else {
        			console.log('Oops! There was an error.');
				console.log(error);
    			}
		});

	}
}
