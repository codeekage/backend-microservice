'use strict';

//REQUIRE DEPENDECIES
const nodeThumbnail = require('node-thumbnail').thumb;

//EXPORT MODULE FUNCTIONS
module.exports = {
    /**
     * THUMBNAIL GENERATOR [PROCTED ROUTE]
     */
    thumbNail: (req, res, next) => {
        //CHECK IF INPUT IS A FILE FORMAT NOT TEXT
        if (!req.files) {
            //RETURN A 404 WHEN FILE IS NOT AN IMAGE 
            return res.status(400).send('No files were uploaded.');
        }
        //GET FILE FROM REQUEST
        let thumbFile = req.files.thumbFile;
        //MOVE FILE TO UPLOAD FOLDER FOR PROCESSING
        thumbFile.mv(`./uploads/${thumbFile.name}`, (err) => {
            //CHECK IF AN ERROR OCCURED
            if (err)
                //RETURN ERROR 500 (INTERNAL SERVER ERROR)
                return res.status(500).send(err);
            //NODETHUMBNAIL FUNCTION WITH OPTIONS
            nodeThumbnail({
                source: `./uploads/${thumbFile.name}`,
                destination: "./thumb-uploads/",
                width: 50,
                skip: true, 
            }).then((e) => {
                //PRINTS IMAGE IF REQUEST IS MADE WITH A BROWSER
                let srcPath = e[0].srcPath.split('\\')[1];
                //SERVER RESPONSE WITH AN IMAGE TAG
                res.send(`<img src="/${srcPath}" />`);
               
            }).catch(function (e) {
                //THROWS AN ERROR
               throw e;
            }).catch(next);
        });
    }
}
