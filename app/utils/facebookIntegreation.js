const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;
const LATEST_API_VERSION = 'v12.0';

const PSID = process.env.PSID;

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
