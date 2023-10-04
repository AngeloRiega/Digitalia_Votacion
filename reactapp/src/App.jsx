import React, { Component } from 'react';
import Encuestas from "@/components/Encuestas";
import { Label } from "@/components/ui/Label/Label";

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
                <div>
                    <Label className="text-3xl">Encuestas</Label>
                    <Encuestas encuestas={encuestas} />
                </div>
            );
    }

    async populateEncuestas() {
        fetch('/api/encuestas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Conexion con el api sin exito. :7137');
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
