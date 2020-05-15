'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogsSchema extends Schema {
  up () {
    this.create('blogs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('blogs')
  }
}

module.exports = BlogsSchema
