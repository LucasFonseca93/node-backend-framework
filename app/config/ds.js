
module.exports = {
	
	mongo: [
		{
			name: 'mongoFiles',
			db: 'db_sisar',
			host: [
				'10.28.60.6:27017',
				'10.28.60.30:27017',
				'10.28.60.53:27017'
			],
			user: 'usr_sisar',
			pass: 'usr_sisar',
			preference: 'w=0&readPreference=nearest&maxPoolSize=6&replicaSet=rpl-helios'
		}
	]
	
};
