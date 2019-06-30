import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Data extends Component {

    getStyle = () => {

        return {
            display: this.props.data.show ? 'block' : 'none'
        }        
    }

    render() {
        console.log ('title',this.props.data.val1);
        return (
            <div style= {this.getStyle()}>
                <h3>{ this.props.data.val1 }</h3>
                <h3>{ this.props.data.val2 }</h3>
                <h3>{ this.props.data.val3 }</h3>
                <h3>{ this.props.data.val4 }</h3>
                <h3>{ this.props.data.val5 }</h3>

                <h3>{ "val3 x val5 = " + (this.props.data.val5 * this.props.data.val3) }</h3>
            </div>
        )
    }
}

Data.propTypes = {
    data: PropTypes.object.isRequired
  }

export default Data
