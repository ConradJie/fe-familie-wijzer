import useGetData from "./useGetData.js";

const useGetPersons = (url) => {
    const {data, dataError, dataLoading} = useGetData(url);
    const persons = data;
    const personsError = dataError;
    const personsLoading = dataLoading;
    return {persons, personsError, personsLoading}
};

export default useGetPersons;