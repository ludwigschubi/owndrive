import React from 'react';
import ns from 'solid-namespace';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
import styles from './Home.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
// import Folders from '../../functional_components/Folders/Folders';
// import Files from '../../functional_components/Files/Files';
import FileUpload from '../../functional_components/FileUpload/FileUpload';
import {ItemList} from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import {getBreadcrumbsFromUrl} from '../../utils/url';
import {folder} from '../../assets/icons/externalIcons';
import fileIcon from '../../assets/icons/File.png';

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
        const webId = this.state.webId;
        const currPath = this.state.currPath;
        const filePath = e.target.files[0];

        fileUtils.uploadFile(filePath, currPath);
    }

    componentDidMount() {
        this.loadCurrentFolder(this.state.currPath, ['/']);
    }

    render() {
        console.log(this.state);
        const {currPath, folders, files, breadcrumbs} = this.state;
        const {webId} = this.props;
        const fileMarkup = this.state.file ? (
            <div className={styles.renderedFile}>
                {this.state.image ? (
                    <img src={this.state.image}></img>
                ) : (
                    this.state.file
                )}
            </div>
        ) : (
            undefined
        );

        return (
            <div>
                <div onClick={this.loadProfile}>test</div>
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
                            {/* // <Folders
                            //     folders={folders}
                            //     currPath={currPath}
                            //     onClick={this.followPath}
                            // />
                            // <Files
                            //     files={files}
                            //     currPath={currPath}
                            //     onClick={this.loadFile}
                            // /> */}
                            <FileUpload onChange={this.uploadFile} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
