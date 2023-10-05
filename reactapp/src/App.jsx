import React, { Component } from 'react';
import Encuestas from "@/components/Encuestas";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { encuestas: [], loading: true, error: null };
    }

    componentDidMount() {
        this.populateEncuestas();
    }

    render() {
        const { loading, error, encuestas } = this.state;

        if (loading) {
            return <div>Cargando...</div>;
        }
        else if (error) {
            return <div>Error: {error.message}</div>;
        }
        else
            return (
                <Encuestas encuestas={encuestas} />
            );
    }

    async populateEncuestas() {
        fetch('/api/encuestas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No hay conexion con el backend, refrescar o verificar mysql.');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    encuestas: data,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                    loading: false,
                });
            });
    }
}
