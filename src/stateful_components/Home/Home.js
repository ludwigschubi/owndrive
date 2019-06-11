import React from "react";
import ns from "solid-namespace";
import rdf from "rdflib";
import styles from "./Home.module.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Breadcrumbs from "../../functional_components/Breadcrumbs/Breadcrumbs";
import Folders from "../../functional_components/Folders/Folders";
import Files from "../../functional_components/Files/Files";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: undefined,
      currPath: undefined,
      webId: props.webId
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

  loadPath(url) {
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

  loadCurrentPath(path, newBreadcrumbs) {
    console.log(path, newBreadcrumbs);
    const currPath = path
      ? path
      : "https://" + this.state.webId.split("/")[2] + "/";
    Promise.resolve(this.loadPath(currPath, newBreadcrumbs)).then(
      sortedContainments => {
        this.setState({
          folders: sortedContainments[1],
          files: sortedContainments[0],
          currPath: currPath,
          breadcrumbs: newBreadcrumbs ? newBreadcrumbs : [this.currPath]
        });
      }
    );
  }

  followPath(path) {
    const breadcrumbs = path.replace("https://", "").split("/");
    breadcrumbs.shift();
    const newBreadcrumbs = ["/"];
    breadcrumbs.forEach(breadcrumb => {
      newBreadcrumbs.push(breadcrumb + "/");
    });
    newBreadcrumbs.pop();
    this.loadCurrentPath(path, newBreadcrumbs);
    return;
  }

  componentDidMount() {
    this.loadCurrentPath(undefined, ["/"]);
  }

  render() {
    return (
      <div>
        <Breadcrumbs
          onClick={this.loadCurrentPath.bind(this)}
          breadcrumbs={this.state.breadcrumbs}
          webId={this.state.webId}
        />
        <Folders
          folders={this.state.folders}
          currPath={this.state.currPath}
          onClick={this.followPath.bind(this)}
        />
        <Files files={this.state.files} />
      </div>
    );
  }
}

export default Home;
