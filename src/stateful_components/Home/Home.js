import React from "react";
import ns from "solid-namespace";
import rdf from "rdflib";
import styles from "./Home.module.css";
import Breadcrumbs from "../../functional_components/Breadcrumbs/Breadcrumbs";
import Folders from "../../functional_components/Folders/Folders";
import Files from "../../functional_components/Files/Files";
import Container from "react-bootstrap/Container";
import FileUpload from "../../functional_components/FileUpload/FileUpload";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : {
      breadcrumbs: undefined,
      currPath: undefined,
      webId: props.webId,
      file: undefined
    };
  }

  sortContainments(urls) {
    const folders = [];
    const files = [];
    urls.forEach(url => {
      if (url.value[url.value.length - 1] === "/") {
        const urlFragments = url.value.split("/");
        const folderUrl = urlFragments[urlFragments.length - 2];
        folders.push(folderUrl);
      } else {
        const urlFragments = url.value.split("/");
        const fileUrl = urlFragments[urlFragments.length - 1];
        files.push(fileUrl);
      }
    });
    return [files, folders];
  }

  loadFolder(url) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    return fetcher.load(url).then(response => {
      const containments = store.each(
        rdf.sym(url),
        rdf.sym(ns().ldp("contains")),
        null
      );
      return this.sortContainments(containments);
    });
  }

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
        });
      }
    );
  }

  loadFile(url) {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    fetcher.load(url).then(response => {
      this.setState({
        file: response.responseText,
        currPath: url
      });
    });
  }

  followPath(path, file) {
    const breadcrumbs = path.replace("https://", "").split("/");
    breadcrumbs.shift();
    const newBreadcrumbs = ["/"];
    breadcrumbs.forEach(breadcrumb => {
      newBreadcrumbs.push(breadcrumb + "/");
    });
    newBreadcrumbs.pop();
    this.loadCurrentFolder(path, newBreadcrumbs);
  }

  // uploadFile = (e) => {
  //     var filePath = e.target.files[0];
  //     var store = rdf.graph();
  //     var fetcher = new rdf.Fetcher(store);
  
  //     let webId = this.props.webId;
  
  //     var reader = new FileReader();
  //     reader.onload = function() {
  //       var data = this.result;
  //       var filename = encodeURIComponent(filePath.name);
  //       var contentType = "image";
  //       let pictureURl = webId.replace("card#me", filename);
  //       fetcher
  //         .webOperation("PUT", pictureURl, {
  //           data: data,
  //           contentType: contentType
  //         })
  //         .then(response => {
  //           if (response.status === 201) {
  //             const updater = new rdf.UpdateManager(store);
  //             let del = currentPicture
  //               ? rdf.st(
  //                   rdf.sym(webId),
  //                   VCARD("hasPhoto"),
  //                   rdf.sym(currentPicture),
  //                   rdf.sym(webId).doc()
  //                 )
  //               : [];
  //             let ins = rdf.st(
  //               rdf.sym(webId),
  //               VCARD("hasPhoto"),
  //               rdf.sym(pictureURl),
  //               rdf.sym(webId).doc()
  //             );
  //             updater.update(del, ins, (uri, ok, message) => {
  //               if (ok)
  //                 console.log(
  //                   "Changes have been applied, reload page to see them"
  //                 );
  //               else alert(message);
  //             });
  //           }
  //         });
  //     };
  //     reader.readAsArrayBuffer(filePath);
  // }

  componentDidMount() {
    this.loadCurrentFolder(undefined, ["/"]);
  }

  componentWillUnmount(){
    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  render() {
    const fileMarkup = this.state.file ? (
      <div className={styles.renderedFile}>{this.state.file}</div>
    ) : (
      undefined
    );

    return (
      <div>
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
              <FileUpload />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
