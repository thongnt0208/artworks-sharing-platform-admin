import axios, { axiosPrivate } from "../../hooks/use-axios";

export async function getArtworksData(pageNumber, pageSize) {
    const response = await axiosPrivate.get("/moderation/artworks", {
        params: {
            state: 0,
            pageNumber,
            pageSize,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data.items;
}

export async function getArtworkDetailData(artworkId) {
    const response = await axios.get(`/artworks/${artworkId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export async function updateArtworkState(artworkId, state, note) {
    const response = await axiosPrivate.put(`/moderation/artworks/${artworkId}/state`, {
        state,
        note, 
    });
    if (response.status !== 200) {
        return false;
    }
    return true;
}