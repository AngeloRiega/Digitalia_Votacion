import React, { useState } from 'react';
import '/src/components/ui/ScrollArea/ScrollArea.module.css';
import { Root as ScrollArea, Viewport as ScrollAreaViewport, Scrollbar as ScrollAreaScrollbar, Thumb as ScrollAreaThumb, Corner as ScrollAreaCorner } from '@radix-ui/react-scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup/RadioGroup";
import { UseToast } from "@/components/ui/Toast/UseToast";
import { Label } from '@/components/ui/Label/Label';

const Encuestas = ({ encuestas }) => {
    const [openDialogVotacion, setOpenDialogVotacion] = useState(false);
    const [opcionesVoto, setOpcionesVoto] = useState([]);
    const [selectedOpcionRespuestaId, setSelectedOpcionRespuestaId] = useState(null);
    const [selectedEncuestaId, setSelectedEncuestaId] = useState(null);
    const [selectedEncuestaTitulo, setSelectedEncuestaTitulo] = useState(null);
    const { toast } = UseToast();

    function formatFechaVoto(fechaVoto: string): string {
        const date = new Date(fechaVoto);
        const hora = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const fecha = date.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });

        return `${hora} - ${fecha}`;
    }

    // Realiza la solicitud POST aquí con el ID de la opción seleccionada
    const handleSubmitVoto = (event) => {
        event.preventDefault();

        if (selectedOpcionRespuestaId !== null)
        {
            // Envío del voto de una encuesta
            fetch('/api/voto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    encuestaId: selectedEncuestaId,
                    opcionRespuestaId: selectedOpcionRespuestaId
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error al enviar el voto + /api/voto`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Manejo la respuesta
                    console.log('Respuesta del servidor:', data);

                    const fechaVotacionFormateada = formatFechaVoto(data.fechaVoto);
                    const encuestaVotada = encuestas.find(
                        (encuesta) => encuesta.id === selectedEncuestaId
                    )?.titulo;

                    toast({
                        title: `${encuestaVotada}`,
                        description: (
                            <>
                                Voto con exito.
                                <br />
                                {fechaVotacionFormateada}
                            </>
                        ),
                    })

                    // Cierro la ventana y limpio ids
                    setSelectedEncuestaId(null);
                    setSelectedOpcionRespuestaId(null);

                    setOpenDialogVotacion(false);
                })
                .catch((error) => {
                    console.error('Error al enviar la solicitud POST:', error);
                    toast({
                        title: "Error",
                        description: "Error en el POST.",
                        variant: "destructive"
                    })
                });
        }
        else
        {
            // Manejo el caso en el que no se ha seleccionado ninguna opción
            console.error('Debes seleccionar una opcion antes de enviar.');
            toast({
                title: "Error",
                description: "Debes seleccionar una opcion antes de enviar.",
                variant: "destructive"
            })
        }
    };

    // Busco las respuestas de la encuesta seleccionada cuando abro el dialog de encuesta
    const handleEstadoDialogVotacion = (estadoDialogVotacion, encuestaId, encuestaTitulo) => {
        if (estadoDialogVotacion) {
            setSelectedEncuestaId(encuestaId);
            setSelectedEncuestaTitulo(encuestaTitulo);

            // Envío el id de la encuesta y traigo sus opciones de respuesta
            fetch(`/api/opcionesrespuestas/encuesta/${encuestaId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error al obtener opciones respuesta + api/opcionesrespuestas/encuesta/${encuestaId}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setOpcionesVoto(data);
                })
                .catch((error) => {
                    console.error('Error al cargar opciones de voto:', error);
                    toast({
                        title: "Error",
                        description: "Error en el GET de opciones de voto.",
                        variant: "destructive"
                    })
                });
        }
        else {
            // Limpio los ids
            setSelectedEncuestaId(null);
            setSelectedOpcionRespuestaId(null);
        }

        // Cambia el estado 'open' según el nuevo estado recibido
        setOpenDialogVotacion(estadoDialogVotacion);
    };

    return (
        <ScrollArea className="ScrollArea">
            <ScrollAreaViewport className="ScrollAreaViewport">
                <div className="flex p-3">
                    {encuestas.map((encuesta) => (  
                        <div key={encuesta.id} className="w-40 h-40 p-3 mr-6 font-mono leading-none duration-500 bg-indigo-100 shadow-lg hover:shadow-2xl">
                            <Dialog open={openDialogVotacion} onOpenChange={(estadoDialog) => handleEstadoDialogVotacion(estadoDialog, encuesta.id, encuesta.titulo)}>
                                <DialogTrigger className="w-full h-full">{encuesta.titulo}</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Votaci&oacute;n para {selectedEncuestaTitulo}</DialogTitle>
                                        <DialogDescription>
                                            {opcionesVoto.length > 0 ? (
                                                <form onSubmit={handleSubmitVoto}>
                                                    <RadioGroup>
                                                        {opcionesVoto.map((opcion) => (
                                                            <div
                                                                className="flex items-center space-x-2"
                                                                key={opcion.id}
                                                            >
                                                                <RadioGroupItem
                                                                    value={opcion.id}
                                                                    id={opcion.id}
                                                                    onClick={() => setSelectedOpcionRespuestaId(opcion.id)} // Actualiza el estado con el ID seleccionado
                                                                />
                                                                <Label htmlFor={opcion.id}>
                                                                    {opcion.texto}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                    <Button type="submit" size="lg">Enviar</Button>
                                                </form>
                                            ) : (
                                                <p>No se encontraron opciones para esta encuesta.</p>
                                            )}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar className="ScrollAreaScrollbar" orientation="vertical">
                <ScrollAreaThumb className="ScrollAreaThumb" />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                <ScrollAreaThumb className="ScrollAreaThumb" />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner className="ScrollAreaCorner" />
        </ScrollArea>
    );
};

export default Encuestas;