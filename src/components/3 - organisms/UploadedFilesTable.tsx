// System
import moment from 'moment';
import React from 'react';

// Material UI
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

// Components
import FileUpload from './FileUpload';

// Entities
import { TwitterFile } from 'src/entity/TwitterFile';

// API
import { getFilesForCurrentUser, createFileForCurrentUser, deleteFileForCurrentUser } from 'src/api/files';

// Helpers
import { uploadFileForCurrentUser } from 'src/utils/files';

interface UploadedFilesTableProps {
    actionType: 'CRUD' | 'LLM' | 'Display' | 'Avatar';
    handleClickEdit: (id: string) => void;
    handleClickDelete: (id: string) => void;
    handleClickGenerate: (id: string) => void;
    handleClickCreateAvatar: (id: string) => void;
    disableButtons?: boolean;
    showUploadButton?: boolean;
    showTitle?: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
    headerContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'white',
        padding: '20px'
    },
    uploadButton: {
        marginLeft: '10px'
    }
}

interface FileUploadModalProps {
    handlePostUpload: () => void;
    handleCancel: () => void;
    open: boolean;
}

const FileUploadModal: React.FC<FileUploadModalProps> = (props) => {
    const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
    const [uploadButtonEnabled, setUploadButtonEnabled] = React.useState(false);

    const onUpload = async () => { 
        if (!fileToUpload) {
            return;
        }

        setUploadButtonEnabled(false);
        
        try {
            let fileKey = await uploadFileForCurrentUser(fileToUpload);
            await createFileForCurrentUser(fileToUpload, fileKey);
            props.handlePostUpload();
            setFileToUpload(null);
        } catch (error) {
            console.error('Error uploading file: ', error);
        } finally {
            setUploadButtonEnabled(true);
        }
    }

    return (
        <Modal open={props.open} sx={styles.modalContainer}>
            <Grid container spacing={2} sx={styles.modalContent}>
                <Grid item xs={12}>
                    <Typography variant="h5">Upload CSV</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FileUpload setFileToUpload={setFileToUpload} setUploadEnabled={setUploadButtonEnabled} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="small" onClick={onUpload} disabled={!uploadButtonEnabled}>Upload</Button>
                    <Button variant="text" color="primary" size="small" onClick={props.handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Modal>
    );
}

interface FileDeleteModalProps {
    file: TwitterFile | null;
    handlePostDelete: () => void;
    handleCancel: () => void;
    open: boolean;
}

const FileDeleteModal: React.FC<FileDeleteModalProps> = (props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleDelete = () => {
        setError(null);
        if (!props.file) {
            setError('System Error: No file set to delete.');
            return;
        }

        setIsLoading(true);
        deleteFileForCurrentUser(props.file.id.toString()).then(() => {
            props.handlePostDelete();
        }).catch((error) => {
            console.error('Error deleting file: ', error);
            setError('Error deleting file.');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Modal open={props.open} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ width: '500px', height: 'auto', backgroundColor: 'white', padding: '20px' }}>
                <Grid item xs={12}>
                    <Typography variant="h5">Are you sure you want to delete this file?</Typography>
                    {error && <Typography variant="body1" color="error">{error}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="error" size="small" disabled={isLoading} onClick={handleDelete}>Delete</Button>
                    <Button variant="text" color="primary" size="small" disabled={isLoading} onClick={props.handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Modal>
    );
}

const UploadedFilesTable: React.FC<UploadedFilesTableProps> = (props) => {
    const [fileToDelete, setFileToDelete] = React.useState<TwitterFile | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [files, setFiles] = React.useState<TwitterFile[]>([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        fetchFiles();
    }, []);

    React.useEffect(() => { 
        console.log(open);
    }, [open]);

    const fetchFiles = () => {
        setIsLoading(true);
        getFilesForCurrentUser().then((files: TwitterFile[]) => {
            setFiles(files);
        }).catch((error) => {
            console.error('Error getting files for current user: ', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancelDeleteFile = () => setDeleteModalOpen(false);
    
    const handlePostDeleteFile = async () => {
        setDeleteModalOpen(false);
        setFileToDelete(null);
        await fetchFiles();
    }

    const handlePostUploadFile = async () => { 
        setOpen(false);
        await fetchFiles();
    }

    const handleOnClickDelete = (id: string) => {
        // Find the file with the given id
        let fileToDelete = files.find((file: TwitterFile) => file.id === parseInt(id));
        if (!fileToDelete) {
            console.error('Could not find file with id: ', id);
            return;
        }

        setFileToDelete(fileToDelete);
        setDeleteModalOpen(true);
    }

    const renderActionButton = (id: string) => {
        if (props.actionType === 'CRUD') {
            return (
                <>
                    <Button variant="contained" color="error" size="small" disabled={props.disableButtons} onClick={() => {handleOnClickDelete(id);}}>Delete</Button>
                </>
            );
        } else if (props.actionType === 'LLM') {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons} onClick={() => { props.handleClickGenerate(id) }}>Select File</Button>;
        } else if (props.actionType === 'Avatar') {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons}>Create Avatar</Button>;
        } else {
            return <></>;
        }
    }

    const renderLoading = () => {
        return (
            <TableRow sx={{ padding: '48px' }}>
                <TableCell colSpan={4} align="center">
                    <CircularProgress />
                </TableCell>
            </TableRow>
        );
    }

    const renderFiles = () => {
        if (files.length === 0) {
            return (
                <TableRow sx={{ padding: '48px' }}>
                    <TableCell colSpan={4} align="center">No files uploaded.</TableCell>
                </TableRow>
            );
        } else {
            return files.map((file: TwitterFile) => {
                return (
                    <TableRow key={file.id}>
                        <TableCell>{file.fileName}</TableCell>
                        <TableCell>{moment(file.createdAt).format('MMM Do, YYYY')}</TableCell>
                        <TableCell>
                            {renderActionButton(file.id.toString())}
                        </TableCell>
                    </TableRow>
                );
            });
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={styles.headerContainer}>
                {props.showTitle && <Typography variant="h5">Uploaded Files</Typography>}
                {props.showUploadButton && <Button variant="text" color="primary" size="small" sx={styles.uploadButton} onClick={handleOpen}>+ Add CSV</Button>}
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell>Uploaded At</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? renderLoading() : renderFiles()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FileUploadModal open={open} handleCancel={handleClose} handlePostUpload={handlePostUploadFile} />
                <FileDeleteModal open={deleteModalOpen} file={fileToDelete} handleCancel={handleCancelDeleteFile} handlePostDelete={handlePostDeleteFile} />
            </Grid>
        </Grid>
    );
}

export default UploadedFilesTable;