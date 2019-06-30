import React, { Component } from 'react';
import Data from './components/data';
import axios from 'axios';

class App extends Component {

    state = {
        data:
        {
            val1: "",
            val2: "",
            val3: "",
            val4: "",
            val5: "",
            show: false
        },

        input: {
            val: ""
        }

    };

    async requestData() {

        const [firstResponse] = await Promise.all([

            axios.get(`http://my-json-server.typicode.com/dr-audrius/person/` + this.state.input).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);

                    console.log('Error', error.message);
                    alert("No such person");
                    return;

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    return;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    return;
                }
                console.log(error.config);
            }),

        ])

        // console.log(firstResponse.data.val1);

        if (typeof firstResponse !== "undefined") {

            const secondResponse = await axios.get(`http://my-json-server.typicode.com/dr-audrius/facility/` + firstResponse.data.val1);
            const thirdResponse = await axios.get(`http://my-json-server.typicode.com/dr-audrius/exposure/` + firstResponse.data.val2);

            var after = {
                'val1': firstResponse.data.val1,
                'val2': firstResponse.data.val2,
                'val3': secondResponse.data.val3,
                'val4': secondResponse.data.val4,
                'val5': thirdResponse.data.val5,
                'show': true
            };

            this.setState({ data: after })

        }

    }


    handleValidation() {
        let input = this.state.input;
        let formIsValid = true;

        if (input === "") {
            formIsValid = false;
            alert("Field cannot be empty");
        }

        if (input.length > 10) {
            formIsValid = false;
            alert("Please enter not more then 10 symbols");
        }


        if (typeof input !== "undefined") {
            if ((!input === "") && (!input.match(/^[a-zA-Z0-9]/))) {
                formIsValid = false;
                alert("Only alphanumeric symbols, please");
            }
        }

        return formIsValid;
    }


    handleChange = (e) => {
        this.setState({ input: e.target.value });
        console.log(this.state.input);
    };


    handleClick = () => {
        if (this.handleValidation()) {
            this.requestData()

        }
    };


    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} />
                <input
                    type="button"
                    value="Lets go!"
                    onClick={this.handleClick}
                />



                <Data data={this.state.data} />
            </div>
        )
    }



}

export default App;
