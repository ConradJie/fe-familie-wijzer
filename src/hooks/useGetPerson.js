import useGetData from "./useGetData.js";

const useGetPerson = (url) => {
    const {data, dataError, dataLoading} = useGetData(url);
    const person = data;
    const personError = dataError;
    const personLoading = dataLoading;
    return {person, personError, personLoading}
};

export default useGetPerson;