import React, { useState, useEffect } from 'react';

import classes from './video.module.css';
import lord from '../../images/lor.jpg';
import apollo from '../../images/apollo13.jpg';
import terminator from '../../images/terminator.JPG';

export const Video = () => {

    const [search, setSearch] = useState('');
    const [videos, setVideos] = useState([]);

    const searchVideo = async (e) => {
        e.preventDefault();
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ title: search })
        }

        const response = await fetch('http://localhost:3000/searchVideos', request);
        const result = await response.json();
        setVideos(result.videos);
    }

    const displayVideos = () => {
        const displayArray = [];
        for (let obj of videos) {
            let imageURL = '';
            if (obj.image === 'lor.jpg') 
                imageURL = lord;
            if (obj.image === 'apollo13.jpg')
                imageURL = apollo;
            if (obj.image === 'terminator.JPG') 
                imageURL = terminator;
            displayArray.push((
            <div className="sm-col-3">
                <img src={ imageURL } id={ classes.image } />
                <h6>{ obj.title }</h6>
            </div>));
        }
        return displayArray;
    }

    return (
        <div id={ classes.container }>
            <form onSubmit={ e => searchVideo(e) }>
                <input 
                    className="form-control" 
                    type="text" 
                    name="title" 
                    placeholder="Search" 
                    aria-label="Search"
                    value = { search }
                    onChange = { e => setSearch(e.target.value) }
                />
                <br />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div>
                { displayVideos() }
            </div>
        </div>
    );
}