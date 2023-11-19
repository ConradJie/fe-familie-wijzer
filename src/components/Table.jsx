import './Table.css';

function Table({className, header, row}) {
    return (
        <table className={`Table ${className}`}>
            <thead>
            {header}
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    )
}

export default Table;