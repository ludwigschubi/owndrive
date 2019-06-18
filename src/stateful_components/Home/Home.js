import React from 'react';
import ns from 'solid-namespace';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
import styles from './Home.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import Folders from '../../functional_components/Folders/Folders';
import Files from '../../functional_components/Files/Files';
import FileUpload from '../../functional_components/FileUpload/FileUpload';
import fileUtils from '../../utils/fileUtils';
import {getBreadcrumbsFromUrl} from '../../utils/url';

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

        console.log(this.state.webId);
        return (
            <div>
                <div onClick={this.loadProfile}>test</div>
                <Breadcrumbs
                    onClick={this.loadCurrentFolder.bind(this)}
                    breadcrumbs={this.state.breadcrumbs}
                    webId={this.state.webId}
                />
                <div>
                    {fileMarkup ? (
                        fileMarkup
                    ) : (
                        <div>
                            <Folders
                                folders={this.state.folders}
                                currPath={this.state.currPath}
                                onClick={this.followPath.bind(this)}
                            />
                            <Files
                                files={this.state.files}
                                currPath={this.state.currPath}
                                onClick={this.loadFile.bind(this)}
                            />
                            <FileUpload onChange={this.uploadFile.bind(this)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
