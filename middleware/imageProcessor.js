// Importation de sharp
const sharp = require('sharp');
sharp.cache(false);

// Importation de filesystem
const fs = require('fs');

const processedImage = async (req, res, next) => {
    if (!req.file) {
        return next()
    };
    try {
        await sharp(req.file.path)
        // Resize pour correspondre à la maquette Figma
            .resize({
                width: 463,
                height: 595,
                fit: sharp.fit.cover
            })
            // Changement de format en webp pour l'optimisation
            .webp({ quality: 80 })
            .toFile(`${req.file.path.split('.')[0]}optimized.webp`)

            fs.unlink(req.path, (error) => {
                req.file.path = `${req.file.path.split('.')[0]}optimized.webp`
                if (error) {
                    console.log(error)
                };
                next()
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = processedImage;