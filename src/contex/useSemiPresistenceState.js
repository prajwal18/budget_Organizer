import { useState, useEffect } from "react";

const useSemiPresistenceState = (key, initialState) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(key)) ||
        initialState
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useSemiPresistenceState;