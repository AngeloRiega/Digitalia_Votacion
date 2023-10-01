import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { encuestas: [], loading: true };
    }

    componentDidMount() {
        this.populateEncuestas();
    }

    static renderEncuestas(encuestas) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>T&iacute;tulo</th>
                        <th>Fecha de creaci&oacute;n</th>
                        <th>Fecha de modificaci&oacute;n</th>
                    </tr>
                </thead>
                <tbody>
                    {encuestas.map(encuesta =>
                        <tr key={encuesta.fechaCreacion}>
                            <td>{encuesta.id}</td>
                            <td>{encuesta.titulo}</td>
                            <td>{encuesta.fechaCreacion}</td>
                            <td>{encuesta.fechaModificacion}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderEncuestas(this.state.encuestas);

        return (
            <div>
                <h1 id="tabelLabel">Encuestas</h1>
                <p>Conexi&oacute;n con mysql</p>
                {contents}
            </div>
        );
    }

    async populateEncuestas() {
        const response = await fetch('/api/encuestas');
        const data = await response.json();
        this.setState({ encuestas: data, loading: false });
    }
}
