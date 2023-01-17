const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const setFilePublic = async (fileId) => {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const getUrl = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        })

        return getUrl
    } catch (error) {
        console.log(error)
    }
}

const uploadFile = async ({ shared }) => {
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: "myteacher_Caesar.jpg",
                mimeType: "image/jpg"
            },
            media: {
                mimeType: "image/jpg",
                body: fs.createReadStream(path.join(__dirname, "/../Julius-Caesar.jpg"))
            }
        })
        const fileId = createFile.data.id;
        const getUrl = await setFilePublic(fileId);

        console.log(getUrl.data);
    } catch (error) {
        console.log(error);
    }
}

const deleteFile = async (fileId) => {
    try {
        console.log('Delete File:::', fileId);
        const deleteFile = await drive.files.delete({
            fileId
        })
        console.log(deleteFile.data, deleteFile.status)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadFile, deleteFile
}