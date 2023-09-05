import axios from "axios";


const instance = axios.create({
    baseURL: 'https://random-word-api.herokuapp.com/',
});

export const getRandomWord = async (length) => {
    return await instance.get(`word?length=${length}`).then(res => res.data[0]);
}
export const checkWordInDict = async (word) => {
    const data = await instance.get(`all`).then(res => res.data);
    return Boolean(data.find(w => w === word));
}
