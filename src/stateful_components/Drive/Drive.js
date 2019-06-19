import React from 'react';
import ns from 'solid-namespace';
import rdf from 'rdflib';
import styles from './Drive.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import FileUpload from '../../functional_components/FileUpload/FileUpload';
import FolderUpload from '../../functional_components/FolderUpload/FolderUpload';
import {ItemList} from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import {folder} from '../../assets/icons/externalIcons';
import fileIcon from '../../assets/icons/File.png';
import {getBreadcrumbsFromUrl} from '../../utils/url';
import User from 'your-user';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = localStorage.getItem('appState')
            ? JSON.parse(localStorage.getItem('appState'))
            : {
                  breadcrumbs: undefined,
                  currPath: undefined,
                  file: undefined,
                  image: undefined,
              };
        this.followPath = this.followPath.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.loadCurrentFolder = this.loadCurrentFolder.bind(this);
    }

    sortContainments(urls) {
        const folders = [];
        const files = [];
        urls.forEach((url) => {
            if (url.value[url.value.length - 1] === '/') {
                const urlFragments = url.value.split('/');
                const folderUrl = urlFragments[urlFragments.length - 2];
                folders.push(folderUrl);
            } else {
                const urlFragments = url.value.split('/');
                const fileUrl = urlFragments[urlFragments.length - 1];
                files.push(fileUrl);
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
                });
            }
        );
    }

    loadFile(url) {
        const newBreadCrumbs = getBreadcrumbsFromUrl(url);

        const contentType = fileUtils.getContentType(url);
        if (contentType === 'image') {
            this.setState({
                file: url,
                image: url,
                currPath: url,
                breadcrumbs: newBreadCrumbs,
            });
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    this.setState({
                        file: xhr.response,
                        currPath: url,
                        breadcrumbs: newBreadCrumbs,
                    });
                    return;
                }
            }
        };

        xhr.open('GET', url);
        xhr.send();
    }

    followPath(path, file) {
        const newBreadcrumbs = getBreadcrumbsFromUrl(path);
        this.loadCurrentFolder(path, newBreadcrumbs);
    }

    uploadFile(e) {
        const currPath = this.state.currPath;
        const filePath = e.target.files[0];

        fileUtils.uploadFile(filePath, currPath);
    }

    uploadFolder(e) {
        const currPath = this.state.currPath;
        const filePath = e.target.files[0];

        fileUtils.uploadFolder(filePath, currPath);
    }

    componentDidMount() {
        this.loadCurrentFolder(this.state.currPath, ['/']);
        const user = new User(this.props.webId);
        user.getName().then((name) => {
            console.log(name);
        });
    }

    render() {
        const {
            currPath,
            folders,
            files,
            breadcrumbs,
            image,
            file,
        } = this.state;
        const {webId} = this.props;
        const fileMarkup = file ? (
            <div className={styles.renderedFile}>
                {image ? <img src={image} alt="requested file"></img> : file}
            </div>
        ) : (
            undefined
        );

        return (
            <div>
                <Breadcrumbs
                    onClick={this.loadCurrentFolder.bind(this)}
                    breadcrumbs={breadcrumbs}
                    webId={webId}
                />
                <div>
                    {fileMarkup ? (
                        fileMarkup
                    ) : (
                        <div>
                            <ItemList
                                items={folders}
                                currPath={currPath}
                                image={folder}
                                onItemClick={this.followPath}
                            />
                            <ItemList
                                isFile
                                items={files}
                                currPath={currPath}
                                image={fileIcon}
                                onItemClick={this.loadFile}
                            />
                            <FileUpload onChange={this.uploadFile.bind(this)} />
                            <FolderUpload
                                onChange={this.uploadFolder.bind(this)}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
