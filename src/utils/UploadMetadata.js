import { pinata } from "../utils/config";

export const uploadMetadata = async (metadata) => {
    try {
        const upload = await pinata.pinJSONToIPFS(metadata);
        return upload.IpfsHash;
    } catch (error) {
        console.log(error);
    }
};