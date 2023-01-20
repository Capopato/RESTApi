export default {
    port: 1337,
    dbUri: "mongodb://0.0.0.0:27017/rest-api",
    saltWorkFactor: 10,
    accesTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
***
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
***
-----END RSA PRIVATE KEY-----`
}