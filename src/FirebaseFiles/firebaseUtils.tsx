import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseconfig";

export const uploadImageToStorage = async imageFile => {
    try {
        const storageRef = ref(
            storage,
            `images/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image to storage:", error);
        throw error;
    }
};

export const dataURLtoFile = (dataURL, filename) => {
    try {
        if (typeof dataURL !== "string") {
            throw new Error("dataURL must be a string");
        }

        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        console.error("Error converting data URL to file:", error);
        return null;
    }
};

/*import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseconfig";

export const uploadImageToStorage = async imageFile => {
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
};

export const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};


..............
export const dataURLtoFile = (dataURL, filename) => {
    try {
        console.log(typeof dataURL);
        if (typeof dataURL !== "string") {
            throw new Error("dataURL must be a string");
        }

        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    } catch (error) {
        console.error("Error converting data URL to file:", error);
        return null; // Or handle the error differently
    }
};

function convertImageToBlob(imageDataUrl, fileName) {
    try {
        console.log(typeof dataURL);
        if (typeof dataURL !== "string") {
            throw new Error("dataURL must be a string");
        }
        const arr = imageDataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    } catch (error) {
        console.error("Error converting data URL to file:", error);
        return null; // Or handle the error differently
    }
}*/
