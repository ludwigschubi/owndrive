<<<<<<< HEAD
import React from "react";
import ns from "solid-namespace";
import rdf from "rdflib";
import styles from "./Home.module.css";
import Breadcrumbs from "../../functional_components/Breadcrumbs/Breadcrumbs";
import Folders from "../../functional_components/Folders/Folders";
import Files from "../../functional_components/Files/Files";
import FileUpload from "../../functional_components/FileUpload/FileUpload";
import fileUtils from "../../utils/fileUtils";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = localStorage.getItem("appState")
      ? JSON.parse(localStorage.getItem("appState"))
      : {
          breadcrumbs: undefined,
          currPath: undefined,
          webId: props.webId,
          file: undefined
        };
  }
=======
import React from 'react';
import ns from 'solid-namespace';
import rdf from 'rdflib';
import styles from './Home.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import Folders from '../../functional_components/Folders/Folders';
import Files from '../../functional_components/Files/Files';
import {getBreadcrumbsFromUrl} from '../../util/url';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: undefined,
            currPath: undefined,
            webId: props.webId,
            file: undefined,
        };
    }
>>>>>>> 4f386c098fd44b7997c53039cba00c9f09cb6e52

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

<<<<<<< HEAD
  loadCurrentFolder(path, newBreadcrumbs) {
    const currPath = path
      ? path
      : "https://" + this.state.webId.split("/")[2] + "/";
    Promise.resolve(this.loadFolder(currPath, newBreadcrumbs)).then(
      sortedContainments => {
        this.setState({
          folders: sortedContainments[1],
          files: sortedContainments[0],
          currPath: currPath,
          breadcrumbs: newBreadcrumbs,
          file: undefined
=======
        return fetcher.load(url).then((response) => {
            const containments = store.each(
                rdf.sym(url),
                rdf.sym(ns().ldp('contains')),
                null
            );
            return this.sortContainments(containments);
>>>>>>> 4f386c098fd44b7997c53039cba00c9f09cb6e52
        });
    }

    loadCurrentFolder(path, newBreadcrumbs) {
        console.log(path, newBreadcrumbs);
        const currPath = path
            ? path
            : 'https://' + this.state.webId.split('/')[2] + '/';
        Promise.resolve(this.loadFolder(currPath, newBreadcrumbs)).then(
            (sortedContainments) => {
                this.setState({
                    folders: sortedContainments[1],
                    files: sortedContainments[0],
                    currPath: currPath,
                    breadcrumbs: newBreadcrumbs,
                    file: undefined,
                });
            }
        );
    }

    loadFile(url) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);

        fetcher.load(url).then((response) => {
            this.setState({
                file: response.responseText,
                currPath: url,
            });
        });
    }

    followPath(path, file) {
        const breadcrumbs = getBreadcrumbsFromUrl(path);
        breadcrumbs.shift();
        const newBreadcrumbs = ['/'];
        breadcrumbs.forEach((breadcrumb) => {
            newBreadcrumbs.push(breadcrumb + '/');
        });
        newBreadcrumbs.pop();
        this.loadCurrentFolder(path, newBreadcrumbs);
    }

<<<<<<< HEAD
  uploadFile(e){
    let webId = this.state.webId;
    let currPath = this.state.currPath;
    var filePath = e.target.files[0];

    fileUtils.uploadFile(filePath, currPath);
    return;
  }

  componentDidMount() {
    this.loadCurrentFolder(this.state.currPath, ["/"]);
  }
=======
    componentDidMount() {
        this.loadCurrentFolder(undefined, ['/']);
    }
>>>>>>> 4f386c098fd44b7997c53039cba00c9f09cb6e52

    render() {
        const fileMarkup = this.state.file ? (
            <div className={styles.renderedFile}>{this.state.file}</div>
        ) : (
            undefined
        );

        return (
            <div>
<<<<<<< HEAD
              <div className={styles.container}>
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
              </div>
              <FileUpload onChange={this.uploadFile.bind(this)}/>
=======
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
                        </div>
                    )}
                </div>
>>>>>>> 4f386c098fd44b7997c53039cba00c9f09cb6e52
            </div>
        );
    }
}

export default Home;
