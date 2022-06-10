function Botones() {
    return (
        <div className="botones">
            <button type="button" className="btn btn-primary izq">Abrir</button>
            <div className="dropdown izq">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    Guardar
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><button className="dropdown-item" type="button">Guardar</button></li>
                    <li><button className="dropdown-item" type="button">Guardar como...</button></li>
                </ul>
            </div>
            <div className="dropdown izq">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    Reportes
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><button className="dropdown-item" type="button">Reporte AST</button></li>
                    <li><button className="dropdown-item" type="button">Reporte de errores</button></li>
                    <li><button className="dropdown-item" type="button">Reporte TS</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Botones;
