// System
import { Storage, Auth } from 'aws-amplify';
import { Buffer } from 'buffer';


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


export const getFileDownloadLinkForCurrentUser = async (key: string): Promise<string> => { 
    const response = await Storage.get(key);
    return response as string;
}


export const convertStringToCsv = (csvString: string): string[][] => {
    const headers: string[] = csvString.split('\"promoted media engagements\"\n')[0].split(',');
    const body: string = csvString.split('\"promoted media engagements\"\n')[1];

    // For loop with a while-loop in it to create the rows
    const csvRows: string[] = [];
    let i = 0;
    while (i < body.length) {
        let row = '';
        let inQuotes = false;
        while (i < body.length) {
            if (body[i] === '\"') {
                inQuotes = !inQuotes;
            } else if (body[i] === '\n' && !inQuotes) {
                break;
            }
            row += body[i];
            i++;
        }
        csvRows.push(row);
        i++;
    }

    return [headers, ...csvRows.map(row => row.split('","'))];
}