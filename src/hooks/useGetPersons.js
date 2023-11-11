import useGetData from "./useGetData.js";

const useGetPersons = (url) => {
    const {data,dataError} = useGetData(url);
    const persons=data;
    const personsError=dataError;
    return { persons, personsError }
};

export default useGetPersons;