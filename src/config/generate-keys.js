const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const keysDirectory = path.join(__dirname, "keys");

if (!fs.existsSync(keysDirectory)) {
    fs.mkdirSync(keysDirectory, { recursive: true });
}

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: "spki",
        format: "pem"
    },

    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
    }
});

fs.writeFileSync(
    path.join(keysDirectory, "private.pem"),
    privateKey
);

fs.writeFileSync(
    path.join(keysDirectory, "public.pem"),
    publicKey
);

console.log("RSA keys generated successfully.");