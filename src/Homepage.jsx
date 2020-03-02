import React, { Component } from 'react';
import axios from 'axios'
import Modal from 'react-modal';


class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            searchResult: [],
            name: '',
            dia: '',
            climate: '',
            population: '',
            orbital_period: '',
            rotaion: '',
            modalIsOpen: false


        }
    }
    logout = () => {
        this.props.history.push('/')
    }
    handleChange = (e) => {
        axios({
            url: `https://swapi.co/api/planets/?search=${e.target.value}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log(response);
                if (response && response.status == 200) {
                    this.setState({ searchResult: response.data.results })
                }
            })
    }

    detailScreen = (objectVal) => {
        this.setState({
            modalIsOpen: true,
            name: objectVal.name ? objectVal.name : 'N/A',
            dia: objectVal.diameter ? objectVal.diameter : 'N/A',
            climate: objectVal.climate ? objectVal.climate : 'N/A',
            population: objectVal.population ? objectVal.population : 'N/A',
            orbital_period: objectVal.orbital_period ? objectVal.orbital_period : 'N/A',
            rotaion: objectVal.rotation_period ? objectVal.rotation_period : 'N/A',
        });

    }
    render() {
        let { searchResult, name, dia, climate, population, orbital_period, rotaion } = this.state
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-4 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search here.." name="search" onChange={(e) => this.handleChange(e)} />
                        </form>
                        <button onClick={() => this.logout()} className="btn-primary">Log Out</button>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        {searchResult.length > 0 ? <>
                            {searchResult.map((each, id) => {
                                var pop_length = each.population.length
                                return (
                                    <div className="col-xs-12 col-md-6 col-lg-3" key={id}>

                                        <div className="card" onClick={() => this.detailScreen(each)}>
                                            <div className="card-block">
                                                <p className="card-title"><span className='err-msg'>Planet Name:</span>{each.name}</p>
                                                <p className="card-text"><span className='err-msg'>Population:</span>
                                                    {pop_length === 2 || pop_length === 4 ? <h5>{each.population}</h5> :
                                                        (pop_length === 7 || pop_length === 8 ? <h4>{each.population}</h4> :
                                                            (pop_length === 9 || pop_length === 10 ? <h3>{each.population}</h3> :
                                                                (pop_length === 11 || pop_length === 12 ? <h2>{each.population}</h2> :
                                                                    (pop_length === 13 || pop_length === 14 ? <h1>{each.population}</h1> : '')
                                                                )
                                                            )
                                                        )
                                                    }
                                                </p>
                                                <p className="card-text"><span className='err-msg'>Diameter:</span>{each.diameter}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}</> : 'No Records found'}
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}></h2>
                        <button onClick={() => this.setState({ modalIsOpen: false })} className='close-btn'>X</button>
                        <h5>Planet Detail:</h5>
                        <form>
                            <p>Name:{name}</p>
                            <p>Diameter:{dia}</p>
                            <p>Climate:{climate}</p>
                            <p>Population:{population}</p>
                            <p>Orbital Period:{orbital_period}</p>
                            <p>Rotaion:{rotaion}</p>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default HomePage;