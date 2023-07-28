// System
import { Storage, Auth } from 'aws-amplify';

/**
 * Uploads a file to the S3 bucket configured with Amplify.
 * @param file: `File` - The file to upload.
 * @returns `string` - The key of the uploaded file.
 */
export const uploadFileForCurrentUser = async (file: File): Promise<string> => {
    const userId = (await Auth.currentSession()).getIdToken().payload.sub;
    const response = await Storage.put(`${userId}/${file.name}`, file, { contentType: file.type });
    return response.key;
}

export const saveFileKeyForCurrentUser = async (file: File, key: string): Promise<void> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };
    
    const response = await fetch(apiPath, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            userId: (await Auth.currentSession()).getIdToken().payload.sub,
            fileName: file.name,
            fileUrl: key
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to save file. Status code: ${response.status}`);
    }
}

export const getFilesForCurrentUser = async (): Promise<object> => {
    if (process.env.REACT_APP_API_BASE_URL === undefined || process.env.REACT_APP_API_BASE_URL === null) {
        throw new Error('API base URL is not defined.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    };
    const apiPath = `${process.env.REACT_APP_API_BASE_URL}/files`;
    const response = await fetch(apiPath, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`Failed to save file. Status code: ${response.status}`);
    }

    return await response.json();
}