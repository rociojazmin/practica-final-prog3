// Importaciones necesarias desde React y axios
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

// Crear un contexto para compartir estado entre componentes
const AppContext = createContext();

// Crear un componente proveedor del contexto
export const AppContextProvider = ({ children }) => {
    // Definir estados para almacenar los datos y manejar el estado de carga
    const [shows, setShows] = useState([]); // Estado para almacenar la lista de programas
    const [show, setShow] = useState({}); // Estado para almacenar un programa específico
    const [loading, setLoading] = useState(true); // Estado para indicar si la lista de programas está cargando
    const [showLoading, setShowLoading] = useState(true); // Estado para indicar si un programa específico está cargando

    // Definir una función para obtener la lista de programas
    const getShows = useCallback(async () => {
        setLoading(true); // Indicar que la carga está en progreso
        try {
            // Hacer una solicitud GET a la API para obtener programas que contengan "barbie" en el título
            const showsReq = await axios.get('https://api.tvmaze.com/search/shows?q=barbie');
            setShows(showsReq.data); // Actualizar el estado con los datos obtenidos
            setLoading(false); // Indicar que la carga ha terminado
        } catch (error) {
            console.log(error); // Mostrar cualquier error en la consola
        }
    }, []);

    // Definir una función para obtener los detalles de un programa específico por su ID
    const getShow = useCallback(async (id) => {
        setShowLoading(true); // Indicar que la carga del programa específico está en progreso
        try {
            // Hacer una solicitud GET a la API para obtener los detalles del programa
            const showReq = await axios.get(`https://api.tvmaze.com/shows/${id}`);
            const showData = showReq.data;

            // Crear un objeto actualizado con los detalles del programa
            const updatedShow = {
                ...showData,
                language: showData.language,
                premiered: showData.premiered,
                ended: showData.ended,
                type: showData.type,
            };

            setShow(updatedShow); // Actualizar el estado con los datos del programa específico
            setShowLoading(false); // Indicar que la carga ha terminado
        } catch (error) {
            console.log('ERROR: El programa no se encontró'); // Mostrar un mensaje de error si la solicitud falla
        }
    }, []);

    // Ejecutar la función getShows cuando el componente se monta
    useEffect(() => {
        getShows();
    }, [getShows]);

    // Retornar el proveedor del contexto con los valores necesarios
    return (
        <AppContext.Provider
            value={{
                shows, // La lista de programas
                loading, // Estado de carga de la lista de programas
                getShow, // Función para obtener los detalles de un programa específico
                show, // Los detalles del programa específico
                showLoading, // Estado de carga del programa específico
            }}
        >
            {children} {/* Renderizar los componentes hijos que están envueltos por el proveedor */}
        </AppContext.Provider>
    );
};

// Crear un hook personalizado para usar el contexto
export const useAppContext = () => {
    const context = useContext(AppContext); // Obtener el contexto
    if (!context) {
        throw new Error('useAppContext debe usarse dentro de AppContextProvider'); // Lanzar un error si el contexto no está disponible
    }
    return context; // Retornar el contexto
};

// Exportar el contexto para su uso en otros módulos
export default AppContext;
