import React, {useEffect, useState} from 'react';
import Notes from './Products.js';

const Loader = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = () => {
        const userInfo = {
            memory: navigator.deviceMemory,
            cpu: navigator.hardwareConcurrency,
            agent: navigator.userAgent
        };
        console.log(userInfo);
        const userInfoAsString = JSON.stringify(userInfo);
        console.log(userInfoAsString);
        const encodedUserRequest = btoa(userInfoAsString);
        console.log(encodedUserRequest);
        var headers = {}
        headers['machaton-personalization'] = encodedUserRequest;
        const server = 'https://glacial-caverns-66223.herokuapp.com/mach/algolia';
        fetch(server, { method: 'GET', headers: headers})
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                setNotes(data);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsError(true);
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {notes && <Notes data={notes}/>}
            {isError && <div>Error fetching data.</div>}
        </div>
    );
};
export default Loader;