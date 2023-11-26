import './Table.css';

function Table({className, header, filter, row, remainingRows}) {
    return (
        <table className={`Table ${className}`}>
            <thead>
            {header}
            </thead>
            <tbody>
            {filter}
            {row}
            {remainingRows}
            </tbody>
        </table>
    )
}

export default Table;