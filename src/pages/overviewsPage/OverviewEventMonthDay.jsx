import './OverviewEventMonthDay.css';
import useGetData from "../../hooks/useGetData.js";
import Table from "../../components/Table.jsx";
import {Cake, Heart} from "@phosphor-icons/react";

function OverviewEventMonthDay() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const url = `/events/month/${month}/day/${day}`;
    const {data, dataError, dataLoading} = useGetData(url);

    return (
        <main>
            <h2>Feestelijke gebeurtenis van de dag</h2>
            <Table
                row={data &&
                    data.map((e) => {
                        return (
                            <tr key={e.id} className="overview-month-day">
                                {(e.eventType === 'BIRTH') &&
                                    <td>
                                        <Cake width={24} height={24}/>
                                        <span>{e.givenNames} {e.surname}</span>
                                        <span>({year - e.date.substring(0,4)} jaar)</span>
                                    </td>}
                                {(e.eventType === 'MARRIAGE') &&
                                    <td>
                                        <Heart width={24} height={24}/>
                                        <span>{e.givenNames} {e.surname} en {e.spouseGivenNames} {e.spouseSurname}</span>
                                        <span>({year - e.date.substring(0,4)} jaar)</span>
                                    </td>}
                            </tr>)
                    })
                }
            />
            {dataLoading && <p>Loading...</p>}
            {dataError && <p>{dataError}</p>}
        </main>
    )
}

export default OverviewEventMonthDay;