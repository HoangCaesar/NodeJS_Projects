const { uploadFile, deleteFile } = require('./models/Upload.model');

const fileId = "11m-X70xwXj9PY2Q_LQ-ql4AMCTNGsRDF"
uploadFile({ shared: true });
// deleteFile(fileId);