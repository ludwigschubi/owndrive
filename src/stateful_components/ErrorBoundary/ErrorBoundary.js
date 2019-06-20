import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: ''};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
        this.setState(error);
    }

    render() {
        console.log(this.state.error);
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    {this.state.error}
                    <h1>Something went wrong.</h1>;
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
