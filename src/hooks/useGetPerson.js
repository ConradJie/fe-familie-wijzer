import useGetData from "./useGetData.js";

const useGetPerson = (url) => {
    const {data,dataError} = useGetData(url);
    const person=data;
    const personError=dataError;
    return { person, personError }
};

export default useGetPerson;