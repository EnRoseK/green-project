import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class DemoClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increase() {
    this.setState({ count: this.state.count + 1 });
  }

  componentWillUnmount() {
    toast.success('Button Destroyed!');
  }

  componentDidUpdate() {
    if (this.state.count === 10) {
      this.props.setShowButton(false);
    }
  }

  render() {
    return (
      <Button className='my-5' onClick={() => this.increase()}>
        Hello {this.state.count}
      </Button>
    );
  }
}
