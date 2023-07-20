import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

const DropzoneContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#9E9E9E',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        borderColor: '#2196f3',
    }
});

interface FileUploadProps {
    setFileUrl: (url: string) => void;
    setUploadEnabled: (enabled: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = (props) => { 
    const [fileName, setFileName] = React.useState('');
    const [error, setError] = React.useState('');

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFileName(file.name);
        props.setUploadEnabled(false);
        setError('');

        if (file.type !== 'text/csv') {
            setError('Invalid file type. Only CSV files are accepted.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const lines = reader.result?.toString().split('\n');
            if (!lines || lines.length === 0) {
                setError('Invalid file. The CSV file must contain tweet_id, created_at, full_text, and user_id headers.');
                return;
            }
            const headers = lines[0].split(',');
            for (let i = 0; i < headers.length; i++) {
                headers[i] = headers[i].replace(/['"]+/g, '').trim();
            }
            if (!['Tweet id', 'Tweet permalink', 'Tweet text', 'time', 'impressions', 'engagements', 'retweets', 'replies'].every(header => headers.includes(header))) {
                setError('Invalid Twitter data file. Please double check that the file contains the official Twitter data headers.');
                return;
            }

            props.setUploadEnabled(true);
            // const url = await uploadFile(file);
            // setFileUrl(url);
        };
        reader.readAsText(file);
    }, [props]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <DropzoneContainer {...getRootProps()}>
            {
                isDragActive ?
                    <Typography>Drop the files here ...</Typography> :
                    <Typography>Drag 'n' drop some files here, or click to select files</Typography>
            }
            {fileName && <Typography>Selected file: {fileName}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" component="label">
                Select File
                <input type="file" hidden {...getInputProps()} />
            </Button>
        </DropzoneContainer>
    );
}

export default FileUpload;