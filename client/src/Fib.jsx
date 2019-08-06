import React, { Component } from 'react';
import axios from 'axios';
class Fib extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seenIndexes: [],
            values: {},
            index: ''
        };
    }
    onSubmit = async (e) => {        
        e.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: ''});
    }
    onChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    renderSeenIndexes = () => {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }
    renderValues = () => {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} i calculated {this.state.values[key]}
                </div>)
        }
        return entries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Enter your index
                    </label>
                    <input type="text" name="index" onChange={this.onChange} />
                    <button>submit</button>
                </form>
                <h3>Indexes i have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;