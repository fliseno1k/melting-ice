const fs = require('fs');
const uuid = require('uuid')
const path = require('path');
const StreamZip = require('node-stream-zip');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const MAIN_FOLDER = path.dirname(require.main.filename);
const ASSETS_FOLDER = `${MAIN_FOLDER}/public/assets`;
const ARCHIVES_FOLDER = `${ASSETS_FOLDER}/archives`;
const SCENES_FOLDER = `${ASSETS_FOLDER}/scenes`;

const BASE_API_URL = "https://api.sketchfab.com/v3/models";
const API_TOKEN = "177c129c836541b9b4cbc3b969fe4324";
const API_HEADERS = {
    Authorization: `Token ${API_TOKEN}`
};


class SketchfabModelLoader {
    constructor() {
        if (!fs.existsSync(ASSETS_FOLDER)) {
            fs.mkdirSync(ASSETS_FOLDER, { recursive: true });
        }
    }

    async loadModel(modelUrl) {
        const uid = this._parseModeUid(modelUrl);
        const model = await this._getModelData(uid);
        const modelLoadingData = await this._requestModelLoadingUrl(uid);
        const archivePath = await this._loadModel(modelLoadingData.gltf.url);
        const unzipResult = await this._extractSceneFile(archivePath);
        const image = model.thumbnails.images[0];
        
        await this._unlinkArchive(archivePath);

        return {
            imageUrl: image.url, 
            sceneUrl: unzipResult
        };
    }

    _parseModeUid(modelUrl) {
        return modelUrl.split('-').at(-1);
    }

    async _unlinkArchive(archivePath) {
        fs.unlinkSync(archivePath);
    }

    async _unlinkArchive(archivePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(archivePath, (err) => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        })
            .then(_ => true)
            .catch(_ => false);
    }

    async _getModelData(uid) {
        return await fetch(
            `${BASE_API_URL}/${uid}`,
            {
                method: "GET",
                headers: API_HEADERS 
            }
        ).then(res => res.json());
    }

    async _requestModelLoadingUrl(uid) {
        return await fetch(
            `${BASE_API_URL}/${uid}/download`,
            { headers: API_HEADERS }
        ).then(res => res.json());
    }

    async _loadModel(loadingUrl) {
        const uid = uuid.v1();
        const loadingResponse = await fetch(loadingUrl);

        if (loadingResponse.status !== 200) {
            return undefined;
        }

        if (!fs.existsSync(ARCHIVES_FOLDER)) {
            fs.mkdirSync(ARCHIVES_FOLDER, { recursive: true });
        }

        const archivePath = `${ARCHIVES_FOLDER}/${uid}.${loadingResponse.headers.get("content-type").split('/').at(-1)}`;
        const destination = fs.createWriteStream(archivePath);

        return new Promise((resolve, reject) => {
            loadingResponse.body.pipe(destination);
            loadingResponse.body.on("start", () => console.log("Start model loading"));
            loadingResponse.body.on("end", resolve);
            destination.on("error", reject);
        })
            .then(res => archivePath)
            .catch(err =>  undefined)
            .finally(_ => destination.close());
    }

    async _extractSceneFile(archivePath) {
        if (!fs.existsSync(archivePath)) {
            return undefined;
        }
        
        if (!fs.existsSync(SCENES_FOLDER)) {
            fs.mkdirSync(SCENES_FOLDER, { recursive: true });
        }

        return new Promise(async (resolve, reject) => {
            try {
                const destination = `${SCENES_FOLDER}/scene-${uuid.v1()}`;
                const zip = new StreamZip.async({ file: archivePath });
                await zip.extract(null, destination);
                await zip.close();

                const relativePath = path
                    .relative(MAIN_FOLDER, destination)
                    .replace(/\\/g, "/")
                    .replace('public', 'static');                    
                resolve(relativePath);   

            } catch(e) {
                reject(e);
            }
        })
            .then(path => path)
            .catch(e => undefined);
    }
}

module.exports = SketchfabModelLoader;