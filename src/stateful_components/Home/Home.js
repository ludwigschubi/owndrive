import React from 'react';
import ns from 'solid-namespace';
import rdf from 'rdflib';
import auth from 'solid-auth-client';
import styles from './Home.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import FileUpload from '../../functional_components/FileUpload/FileUpload';
import {ItemList} from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import { getBreadcrumbsFromUrl } from '../../utils/url';
import ACLController from 'your-acl';
import FileCreation from '../../functional_components/FileCreation/FileCreation';
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

        this.createFolder = this.createFolder.bind(this);
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

        auth.fetch(url).then((response) => {
            response.text().then((text) => {
                this.setState({
                    file: text,
                    currPath: url,
                    breadcrumbs: newBreadCrumbs,
                });
            });
        });
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

    createFolder(){
        const store = rdf.graph();
        const updater = new rdf.UpdateManager(store);

        const folderAddress = window.prompt("Please enter the name for your new folder:", "Untitled Folder");
        const request = {
            method: "POST",
            headers: { slug: folderAddress, link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"'}
        }

        auth.fetch(this.state.currPath, request).then(() => {
            this.loadCurrentFolder(this.state.currPath, this.state.breadcrumbs)
        });
    }

    componentDidMount() {
        const acl = new ACLController("https://ludwigschubert.solid.community/inbox/bejow");
        acl.getAgents().then((agents) => {
            console.log(agents);
        })
        // acl.getAccessGroups().then((response) => {
        //     console.log(response);
        //     acl.getAgents().then((response) => {
        //         console.log(response);
        //     })
        // });
        this.loadCurrentFolder(this.state.currPath, ['/']);
    }

    render() {
        console.log(this.state);
        const {currPath, folders, files, breadcrumbs} = this.state;
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
                            <FileCreation onClick={this.createFolder}/>
                            <FileUpload onChange={this.uploadFile.bind(this)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
