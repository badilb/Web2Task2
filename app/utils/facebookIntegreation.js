const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const PAGE_ID = '236477239542646';
const LATEST_API_VERSION = 'v12.0';

const PSID = '7224403757652362';

exports.sendMessage = async (messageText) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${LATEST_API_VERSION}/${PAGE_ID}/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: {
          id: PSID,
        },
        messaging_type: 'RESPONSE',
        message: {
          text: messageText,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.message, error);
  }
};
