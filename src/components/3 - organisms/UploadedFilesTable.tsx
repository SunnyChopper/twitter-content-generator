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

// Helpers
import { uploadFileForCurrentUser, createFileForCurrentUser, getFilesForCurrentUser, deleteFileForCurrentUser } from 'src/utils/files';

interface UploadedFilesTableProps {
    actionType: 'CRUD' | 'LLM' | 'Display';
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
    uploadButton: {
        marginLeft: '10px'
    }
}

interface FileUploadModalProps {
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
        
        try {
            let fileKey = await uploadFileForCurrentUser(fileToUpload);
            await createFileForCurrentUser(fileToUpload, fileKey);
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    }

    return (
        <Modal open={props.open} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ width: '500px', height: '500px', backgroundColor: 'white', padding: '20px' }}>
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
            props.handleCancel();
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
        setIsLoading(true);
        getFilesForCurrentUser().then((files: TwitterFile[]) => {
            setFiles(files);
        }).catch((error) => {
            console.error('Error getting files for current user: ', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    React.useEffect(() => { 
        console.log(open);
    }, [open]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        } else {
            return <Button variant="contained" color="primary" size="small" disabled={props.disableButtons}>Create Avatar</Button>;
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
                            {isLoading ? (
                                <TableRow sx={{ padding: '64px' }}>
                                    <TableCell colSpan={4} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : files.map((file: TwitterFile) => {
                                return (
                                    <TableRow key={file.id}>
                                        <TableCell>{file.fileName}</TableCell>
                                        <TableCell>{moment(file.createdAt).format('MMM Do, YYYY')}</TableCell>
                                        <TableCell>
                                            {renderActionButton(file.id.toString())}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FileUploadModal open={open} handleCancel={handleClose} />
                <FileDeleteModal open={deleteModalOpen} file={fileToDelete} handleCancel={handleClose} />
            </Grid>
        </Grid>
    );
}

export default UploadedFilesTable;