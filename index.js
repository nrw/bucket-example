var level = require('level')
  , test = require('tape')
  , Doc = require('crdt').Doc
  , Scuttlebucket = require('scuttlebucket')
  , sublevel = require('level-sublevel')
  , rimraf = require('rimraf')
  , scuttlebutt = require('level-scuttlebutt')

db = sublevel(level(__dirname+'/_db'))

scuttlebutt(db, 'udid', function(name){
  return new Scuttlebucket()
})

test('setup', function(t){
  rimraf(__dirname+'_db', t.end)
})
test('opened scuttlebucket has writeable sub scuttles', function(t) {
  t.plan(1)
  db.open('one_doc', function (err, bucket) {
    if (err) console.log('err', err)

    bucket.add('subdoc', new Doc())

    sub = bucket.get('subdoc')

    t.doesNotThrow(function () {
      sub.add('one_row', {details: 'value'})
    })
  })
})
