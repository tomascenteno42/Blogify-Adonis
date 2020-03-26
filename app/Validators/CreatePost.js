'use strict'

const Base = require('./Base');

class CreatePost extends Base {
  get rules () {
    return {
      title: 'required',
      subtitle: 'required',
      body: 'required'
    }
  }
  get messages () {
    return {
      'required': 'Hey homie, complete the {{ field }}'
    }
  }
}

module.exports = CreatePost
