import React from 'react';
import ns from 'solid-namespace';
import rdf from 'rdflib';
import auth from 'solid-auth-client';
import styles from './Drive.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import FileUpload from '../../functional_components/FileUpload/FileUpload';
import {ItemList} from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import {getBreadcrumbsFromUrl} from '../../utils/url';
import ACLController from 'your-acl';
import FileCreation from '../../functional_components/FileCreation/FileCreation';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import Buttons from '../../functional_components/Buttons/Buttons';
import {InputWindow} from '../../functional_components/InputWindow';
import Container from 'react-bootstrap/Container';
import {ConsentWindow} from '../../functional_components/ConsentWindow';

class Drive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: undefined,
            currPath: undefined,
            file: undefined,
            image: undefined,
            selectedItems: [],
            folders: undefined,
            isCreateFolderVisible: false,
            isConsentWindowVisible: false,
            isCreateFileVisible: false,
            files: undefined,
        };

        this.createFolder = this.createFolder.bind(this);
        this.createFile = this.createFile.bind(this);
        this.followPath = this.followPath.bind(this);
        this.uploadFolder = this.uploadFolder.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.loadCurrentFolder = this.loadCurrentFolder.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.openCreateFolderWindow = this.openCreateFolderWindow.bind(this);
        this.closeCreateFolderWindow = this.closeCreateFolderWindow.bind(this);
        this.openConsentWindow = this.openConsentWindow.bind(this);
        this.closeConsentWindow = this.closeConsentWindow.bind(this);
        this.openCreateFileWindow = this.openCreateFileWindow.bind(this);
        this.closeCreateFileWindow = this.closeCreateFileWindow.bind(this);
    }

    sortContainments(urls) {
        const folders = [];
        const files = [];
        urls.forEach((url) => {
            if (url.value[url.value.length - 1] === '/') {
                const urlFragments = url.value.split('/');
                const folderUrl = urlFragments[urlFragments.length - 2];
                folders.push(decodeURIComponent(folderUrl));
            } else {
                const urlFragments = url.value.split('/');
                const fileUrl = urlFragments[urlFragments.length - 1];
                files.push(decodeURIComponent(fileUrl));
            }
        });
        return [files, folders];
    }

    loadFolder(url) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);

        return fetcher.load(url).then((response) => {
            const containments = store.each(
                rdf.sym(url),
                rdf.sym(ns().ldp('contains')),
                null
            );
            return this.sortContainments(containments);
        });
    }

    loadCurrentFolder(path, newBreadcrumbs) {
        const currPath = path
            ? path
            : 'https://' + this.props.webId.split('/')[2] + '/';
        Promise.resolve(this.loadFolder(currPath, newBreadcrumbs)).then(
            (sortedContainments) => {
                this.setState({
                    folders: sortedContainments[1],
                    files: sortedContainments[0],
                    currPath: currPath,
                    breadcrumbs: newBreadcrumbs,
                    file: undefined,
                    image: undefined,
                    selectedItems: [],
                });
            }
        );
    }

    loadFile(url) {
        if (this.state.selectedItems.includes(url) === false) {
            const newSelection = this.state.selectedItems;
            newSelection.push(url);
            this.setState({
                selectedItems: newSelection,
            });
        } else {
            const newBreadCrumbs = getBreadcrumbsFromUrl(url);

            const contentType = fileUtils.getContentType(url);
            if (contentType === 'image') {
                this.setState({
                    file: url,
                    image: url,
                    currPath: url,
                    breadcrumbs: newBreadCrumbs,
                    selectedItems: [],
                });
                return;
            }

            auth.fetch(url).then((response) => {
                response.text().then((text) => {
                    this.setState({
                        file: text,
                        currPath: url,
                        breadcrumbs: newBreadCrumbs,
                        selectedItems: [],
                    });
                });
            });
        }
    }

    followPath(path) {
        fileUtils.getFolderTree(path).then((results) => {
            console.log(results);
        });
        if (this.state.selectedItems.includes(path)) {
            const newBreadcrumbs = getBreadcrumbsFromUrl(path);
            this.loadCurrentFolder(path, newBreadcrumbs);
        } else {
            const newSelection = this.state.selectedItems;
            newSelection.push(path);
            this.setState({
                selectedItems: newSelection,
            });
        }
    }

    uploadFile(e) {
        const currPath = this.state.currPath;
        const filePath = e.target.files[0];

        fileUtils.uploadFile(filePath, currPath).then(() => {
            this.loadCurrentFolder(this.state.currPath, this.state.breadcrumbs);
        });
    }

    clearSelection(e) {
        if (
            e.target.nodeName !== 'IMG' &&
            e.target.nodeName !== 'P' &&
            e.target.innerHTML !== 'Delete'
        ) {
            this.setState({
                selectedItems: [],
            });
        }
    }

    createFolder(folderAddress) {
        const request = {
            method: 'POST',
            headers: {
                slug: folderAddress,
                link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"',
                contentType: 'text-turtle',
            },
        };

        auth.fetch(this.state.currPath, request).then(() => {
            this.loadCurrentFolder(this.state.currPath, this.state.breadcrumbs);
        });
    }

    createFile(folderAddress) {
        const request = {
            method: 'POST',
            headers: {
                slug: folderAddress,
                link: '<http://www.w3.org/ns/ldp#Resource>; rel="type"',
                contentType: 'text-turtle',
            },
        };

        auth.fetch(this.state.currPath, request).then(() => {
            this.loadCurrentFolder(this.state.currPath, this.state.breadcrumbs);
        });
    }

    componentDidMount() {
        // try {
        //     if (!JSON.parse(localStorage.getItem('appState')).currPath) {
        //         this.loadCurrentFolder(this.state.currPath, ['/']);
        //     } else {
        //         console.log('Using cached state...');
        //         this.loadCurrentFolder(
        //             JSON.parse(localStorage.getItem('appState')).currPath,
        //             JSON.parse(localStorage.getItem('appState')).breadcrumbs
        //         );
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    uploadFolder(e) {
        const files = e.target.files;
        for (let file = 0; file < files.length; file++) {
            fileUtils
                .uploadFolderOrFile(
                    files[file],
                    this.state.currPath +
                        encodeURIComponent(files[file].webkitRelativePath)
                )
                .then((response) => {
                    console.log(file, response);
                    if (file === files.length - 1) {
                        this.loadCurrentFolder(
                            this.state.currPath,
                            this.state.breadcrumbs
                        );
                    }
                });
        }
    }

    closeCreateFolderWindow() {
        this.setState({
            isCreateFolderVisible: false,
        });
    }

    openCreateFolderWindow() {
        this.setState({
            isCreateFolderVisible: true,
        });
    }

    closeConsentWindow() {
        this.setState({
            isConsentWindowVisible: false,
        });
    }

    openConsentWindow() {
        this.setState({
            isConsentWindowVisible: true,
        });
    }

    closeCreateFileWindow() {
        this.setState({
            isCreateFileVisible: false,
        });
    }

    openCreateFileWindow() {
        this.setState({
            isCreateFileVisible: true,
        });
    }

    componentWillUnmount() {
        // console.log('Caching state...');
        // localStorage.setItem('appState', JSON.stringify(this.state));
    }

    render() {
        const {
            currPath,
            folders,
            files,
            breadcrumbs,
            isCreateFolderVisible,
            isCreateFileVisible,
            isConsentWindowVisible,
        } = this.state;
        const {webId} = this.props;
        const fileMarkup = this.state.file ? (
            <div className={styles.renderedFile}>
                {this.state.image ? (
                    <img src={this.state.image} alt="requested file"></img>
                ) : (
                    this.state.file
                )}
            </div>
        ) : (
            undefined
        );

        return (
            <div style={{height: '100%'}} onClick={this.clearSelection}>
                <Breadcrumbs
                    onClick={this.loadCurrentFolder}
                    breadcrumbs={breadcrumbs}
                    webId={webId}
                />
                <div>
                    {fileMarkup ? (
                        fileMarkup
                    ) : (
                        <div>
                            <ConsentWindow
                                windowName="Delete File?"
                                selectedItems={this.state.selectedItems}
                                info={
                                    this.state.selectedItems.length > 1
                                        ? 'Do you really want to delete these items?'
                                        : 'Do you really want to delete this item?'
                                }
                                onSubmit={(selectedItems) =>
                                    fileUtils.deleteItems(selectedItems)
                                }
                                className={
                                    isConsentWindowVisible
                                        ? styles.visible
                                        : styles.hidden
                                }
                                onClose={this.closeConsentWindow}
                            ></ConsentWindow>
                            <InputWindow
                                windowName="Create Folder"
                                info=""
                                onSubmit={(value) => this.createFolder(value)}
                                className={
                                    isCreateFolderVisible
                                        ? styles.visible
                                        : styles.hidden
                                }
                                onClose={this.closeCreateFolderWindow}
                            />
                            <InputWindow
                                windowName="Create File"
                                info=""
                                onSubmit={(value) => this.createFile(value)}
                                className={
                                    isCreateFileVisible
                                        ? styles.visible
                                        : styles.hidden
                                }
                                onClose={this.closeCreateFileWindow}
                            />
                            <Container>
                                <ItemList
                                    selectedItems={this.state.selectedItems}
                                    items={folders}
                                    currPath={currPath}
                                    image={folder}
                                    onItemClick={this.followPath}
                                    onDelete={(item) => {
                                        this.openConsentWindow();
                                    }}
                                    onAccess={(item) => {
                                        fileUtils.changeAccess(item);
                                    }}
                                    onRename={(item) => {
                                        fileUtils.renameItem(item);
                                    }}
                                    onInfo={(item) => {
                                        fileUtils.getInfo(item);
                                    }}
                                />
                                <ItemList
                                    selectedItems={this.state.selectedItems}
                                    isFile
                                    items={files}
                                    currPath={currPath}
                                    image={fileIcon}
                                    onItemClick={this.loadFile}
                                    onDelete={(item) => {
                                        this.openConsentWindow();
                                    }}
                                    onAccess={(item) => {
                                        fileUtils.changeAccess(item);
                                    }}
                                    onRename={(item) => {
                                        fileUtils.renameFile(item);
                                    }}
                                    onInfo={(item) => {
                                        fileUtils.onInfo(item);
                                    }}
                                />
                                <Buttons
                                    onFileCreation={this.openCreateFileWindow}
                                    onFolderCreation={
                                        this.openCreateFolderWindow
                                    }
                                    onFolderUpload={this.uploadFolder}
                                    onFileUpload={this.uploadFile}
                                ></Buttons>
                            </Container>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Drive;
