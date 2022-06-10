function Tab(props){
    return (
        <li key={props.index} className="nav-item" role="presentation">
            <button className="li nav-link active" id={props.id} data-bs-toggle="tab" data-bs-target={props.data_target} type="button" role="tab" aria-controls={props.ariaControls} aria-selected="false">LFScript</button>
        </li>
    );
}

export default Tab