'use strict';

const nodeThumbnail = require('node-thumbnail').thumb;

module.exports = {
    thumbNail: (req, res, next) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        let thumbFile = req.files.thumbFile;
        thumbFile.mv(`./uploads/${thumbFile.name}`, (err) => {
            if (err)
                return res.status(500).send(err);
            nodeThumbnail({
                source: `./uploads/${thumbFile.name}`,
                destination: "./thumb-uploads/",
                width: 50,
                skip: true, // if set to 'true', console.log status messages will be supressed
            }).then((e) => {
                let srcPath = e[0].srcPath.split('\\')[1];
                res.send(`<img src="/${srcPath}" />`);
                console.log('Success', e);
            }).catch(function (e) {
                console.log('Error', e);
            }).catch(next);
        });
    }
}
