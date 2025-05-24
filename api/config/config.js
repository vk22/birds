module.exports = {
  port: 8443,
  dbURL: 'mongodb+srv://vercel-admin-user:akGL1pJbnrbhU03Y@cluster0.ly3sl.mongodb.net/birds',
  dbOptions: { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  jwtToken: '7383dj2948fk0',
  emailTransport: {
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  },
  emailFrom: '"BIRDS" <info@birds.moscow>',
  emailTo: 'v.kushnir22@gmail.com',
  appFolderUploads: {
    'localhost': '/Users/viktorkusnir/apps/birds/static/uploads/',
    'birds.moscow': '/var/www/birds/www/static/uploads/'
  },
  projectFolderPath: '/var/www/birds/www/static/uploads/projects/',
  lotFolderPath: '/var/www/birds/www/static/uploads/lots/',
  promoFolderPath: '/var/www/birds/www/static/uploads/promo/'

}