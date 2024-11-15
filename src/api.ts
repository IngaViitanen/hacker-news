import axios from "axios";
import type { SearchApiResult } from "./api.types";

const baseUrl = import.meta.env.VITE_API_BASEURL;
const searchQueryBase = import.meta.env.VITE_API_SEARCH_QUERY_BASE;

//get articles by search
export const getSearchResults = async (query: string) => {
    const response = await axios.get<SearchApiResult>(baseUrl + searchQueryBase + query)
    return response.data
}