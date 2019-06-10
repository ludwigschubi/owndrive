import React from "react";
import ns from "solid-namespace";
import rdf from "rdflib";
import styles from "./Home.module.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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
    const newBreadcrumbs = ["/"]
    breadcrumbs.forEach((breadcrumb) => {
        newBreadcrumbs.push(breadcrumb + "/")    
    })
    newBreadcrumbs.pop();
    this.loadCurrentPath(path, newBreadcrumbs);
    return
  }

  componentDidMount() {
    this.loadCurrentPath(undefined, ["/"]);
  }

  render() {

    const files = this.state.files
      ? this.state.files.map((file, index) => {
          return <li key={"file" + index}>{file}</li>;
        })
      : undefined;

    const folders = this.state.folders
      ? this.state.folders.map((folder, index) => {
          return (
            <li key={"folder" + index}>
              <button onClick={() => this.followPath(this.state.currPath + folder + "/")}>{folder}</button>
            </li>
          );
        })
      : undefined;

    const fileList =
      folders && files ? folders.concat(files) : folders ? folders : files;

    const fileMarkup = fileList ? (
      <ul className={styles.fileMarkup}>{fileList}</ul>
    ) : (
      undefined
    );

    console.log(this.state);

    const breadcrumbMarkup = this.state.breadcrumbs
      ? this.state.breadcrumbs.map((currentBreadcrumb, currentIndex) => {
          if (currentIndex !== 0) {
            const breadcrumbsSoFar = [];
            this.state.breadcrumbs.forEach((breadcrumb, index) => {
                if (index <= currentIndex){
                    breadcrumbsSoFar.push(breadcrumb);
                }
            })
            console.log(breadcrumbsSoFar);
            const currentBreadcrumbs = breadcrumbsSoFar.join("");
            const root = "https://" + this.state.webId.split("/")[2];

            return (
              <Breadcrumb.Item
                key={currentIndex}
                onClick={() =>
                  {this.loadCurrentPath(root + currentBreadcrumbs, breadcrumbsSoFar)}
                }
              >
                {currentBreadcrumb}
              </Breadcrumb.Item>
            );
          } else {
            return <Breadcrumb.Item key={0} href="/">Home</Breadcrumb.Item>;
          }
        })
      : undefined;

    return (
      <div>
        <Breadcrumb>
          {breadcrumbMarkup}
        </Breadcrumb>
        {fileMarkup}
      </div>
    );
  }
}

export default Home;
