function decodeBase64UrlSafe(input) {
if (!input) throw new Error('Missing base64 input');
const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
const padLen = (4 - (normalized.length % 4)) % 4;
const padded = normalized + '='.repeat(padLen);
try {
return Buffer.from(padded, 'base64').toString('utf8');
} catch (e) {
throw new Error('Invalid base64');
}
}


function encodeBase64UrlSafe(input) {
const b = Buffer.from(input, 'utf8').toString('base64');
return b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}


module.exports = { decodeBase64UrlSafe, encodeBase64UrlSafe };