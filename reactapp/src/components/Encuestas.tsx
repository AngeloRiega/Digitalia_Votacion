import React, { useState, PureComponent, useEffect } from 'react';
import s from '@/components/ui/ScrollArea/ScrollArea.module.css';
/*import '/src/components/ui/ScrollArea/ScrollArea.module.css';*/
/*import '/src/components/ui/Tabs/Tabs.module.css';*/
import t from '@/components/ui/Tabs/Tabs.module.css';
import { Root as ScrollArea, Viewport as ScrollAreaViewport, Scrollbar as ScrollAreaScrollbar, Thumb as ScrollAreaThumb, Corner as ScrollAreaCorner } from '@radix-ui/react-scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup/RadioGroup";
import { UseToast } from "@/components/ui/Toast/UseToast";
import { Label } from '@/components/ui/Label/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/Tabs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select/Select';

const Encuestas = ({ encuestas }) => {
    const [openDialogVotacion, setOpenDialogVotacion] = useState(false);
    const [opcionesVoto, setOpcionesVoto] = useState([]);
    const [selectedOpcionRespuestaId, setSelectedOpcionRespuestaId] = useState(null);
    const [selectedEncuestaId, setSelectedEncuestaId] = useState(null);
    const [selectedEncuestaTitulo, setSelectedEncuestaTitulo] = useState(null);
    const { toast } = UseToast();
    const [activeTab, setActiveTab] = useState("encuestas");
    const [resultadosData, setResultadosData] = useState([]);

    // Fetch cuando selecciono el tab de resultados
    useEffect(() => {
        if (activeTab === "resultados" && selectedEncuestaId !== null) {
            fetch(`api/Encuestas/${selectedEncuestaId}/votos`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error al obtener resultados + api/Encuestas/${selectedEncuestaId}/votos`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setResultadosData(data);
                })
                .catch((error) => {
                    console.error('Error al cargar resultados:', error);
                    toast({
                        title: "Error",
                        description: "Error en la fetch de resultados.",
                        variant: "destructive"
                    })
                });
        }
    }, [activeTab, selectedEncuestaId, toast]);

    // Formato de fecha para el toast de momento
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

                    // Limpio ids
                    setSelectedOpcionRespuestaId(null);

                    // Cierro la ventana
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
            fetch(`/api/encuestas/${encuestaId}/opcionesrespuesta/`)
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
            setSelectedOpcionRespuestaId(null);
        }

        // Cambia el estado 'open' según el nuevo estado recibido
        setOpenDialogVotacion(estadoDialogVotacion);
    };

    return (
        <Tabs defaultValue="encuestas" className={t.Root}>
            <TabsList className={t.List}>
                <TabsTrigger value="encuestas" className={t.Trigger} onClick={() => setActiveTab("encuestas")}>Encuestas</TabsTrigger>
                <TabsTrigger value="resultados" className={t.Trigger} onClick={() => setActiveTab("resultados")}>Resultados</TabsTrigger>
            </TabsList>

            <TabsContent value="encuestas" className={t.Content}>
                <ScrollArea className={s.ScrollArea}>
                    <ScrollAreaViewport className={s.ScrollAreaViewport}>
                        <div className="flex p-3 justify-center">
                            {encuestas.map((encuesta) => (  
                                <div key={encuesta.id} className="w-40 h-40 p-3 mr-6 font-mono leading-none duration-500 bg-indigo-100 shadow-lg hover:shadow-2xl">
                                    <Dialog open={openDialogVotacion} onOpenChange={(estadoDialogVotacion) => handleEstadoDialogVotacion(estadoDialogVotacion, encuesta.id, encuesta.titulo)}>
                                        <DialogTrigger className="w-full h-full">{encuesta.titulo}</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className="font-mono">
                                                <DialogTitle>Votaci&oacute;n para {selectedEncuestaTitulo}</DialogTitle>
                                                <DialogDescription>
                                                    {opcionesVoto.length > 0 ? (
                                                        <form onSubmit={handleSubmitVoto}>
                                                            <RadioGroup>
                                                                {opcionesVoto.map((opcion) => (
                                                                    <div
                                                                        className="flex items-center space-x-2 font-mono"
                                                                        key={opcion.id}
                                                                    >
                                                                        <RadioGroupItem
                                                                            value={opcion.id}
                                                                            id={opcion.id}
                                                                            checked={selectedOpcionRespuestaId === opcion.id}
                                                                            onClick={() => setSelectedOpcionRespuestaId(opcion.id)} // Actualiza el estado con el ID seleccionado
                                                                        />
                                                                        <Label htmlFor={opcion.id} onClick={() => setSelectedOpcionRespuestaId(opcion.id)}>
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
                    <ScrollAreaScrollbar className={s.ScrollAreaScrollbar} orientation="horizontal">
                        <ScrollAreaThumb className={s.ScrollAreaThumb} />
                    </ScrollAreaScrollbar>
                    <ScrollAreaScrollbar className={s.ScrollAreaScrollbar} orientation="vertical">
                        <ScrollAreaThumb className={s.ScrollAreaThumb} />
                    </ScrollAreaScrollbar>
                    <ScrollAreaCorner className={s.ScrollAreaCorner} />
                </ScrollArea>
            </TabsContent>

            <TabsContent value="resultados" className={t.Content}>
                <div style={{ minHeight: '200px' }}>
                    <Select onValueChange={(encuestaId) => { setSelectedEncuestaId(encuestaId) }} value = { selectedEncuestaId?.toString() }>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Encuestas"/>
                        </SelectTrigger>
                        <SelectContent>
                            {encuestas.map((encuesta) => (
                                <SelectItem
                                    key={encuesta.id}
                                    value={encuesta.id.toString()}
                                >
                                    {encuesta.titulo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <ResponsiveContainer width="100%" height={800}>
                        <BarChart data={resultadosData} className="font-mono">
                            <XAxis
                                stroke="#888888"
                                fontSize={15}
                                tickLine={false}
                                axisLine={false}
                                dataKey="tituloOpcionRespuesta"
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={15}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value} votos`}
                                dataKey="cantidadVotos"
                            />
                            <Bar dataKey="cantidadVotos" fill="#A7D8E5" radius={[4, 4, 0, 0]} name="Votos" />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend  />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default Encuestas;