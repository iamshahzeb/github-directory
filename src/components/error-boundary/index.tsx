import React from 'react';

class ErrorBoundary extends React.Component {
 constructor(props: {} | Readonly<{}>) {
  super(props);
  this.state = { hasError: false };
 }

 static getDerivedStateFromError(error: any) {
  // Update state so the next render will show the fallback UI.
  return { hasError: true };
 }

 render() {
  // Check if the error is thrown
  // @ts-ignore
  if (this.state.hasError) {
   // You can render any custom fallback UI
   return (
    <div>
     <h2>Oops, there is an error!</h2>
     <button type="button" onClick={() => this.setState({ hasError: false })}>
      Try again?
     </button>
    </div>
   );
  }

  // Return children components in case of no error
  // @ts-ignore

  return this.props.children;
 }
}

export default ErrorBoundary;
