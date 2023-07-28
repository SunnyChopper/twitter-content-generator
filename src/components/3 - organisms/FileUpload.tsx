// System
import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';
import { Storage } from 'aws-amplify';

// Material UI
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    setFileToUpload(file: File): void;
    setUploadEnabled: (enabled: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = (props) => { 
    const [fileName, setFileName] = React.useState('');
    const [error, setError] = React.useState('');

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0];
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
            
            props.setFileToUpload(file);
            props.setUploadEnabled(true);
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
            <input type="file" hidden {...getInputProps()} />
        </DropzoneContainer>
    );
}

export default FileUpload;