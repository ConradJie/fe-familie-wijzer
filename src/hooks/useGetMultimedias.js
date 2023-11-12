import useGetData from "./useGetData.js";

const useGetMultimedias = (url) => {
    const {data, dataError, dataLoading} = useGetData(url);
    const multimedias = data;
    const multimediasError = dataError;
    const multimediasLoading = dataLoading;
    return {multimedias, multimediasError, multimediasLoading}
};

export default useGetMultimedias;