import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import React from 'react';


type Photo = Schema['Photo']['type'];

const client = generateClient<Schema>();

export default function PhotoDisplay() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() =>{
    const sub = client.models.Photo.observeQuery().subscribe({
        next: ({items}) => {
            setPhotos([...items])
        },
    });

    return () => sub.unsubscribe();
    }, []);
return (
    <ul>
        {photos.map((photo) => (
            <li key={photo.id}>{photo.title}</li>
        ))}
    </ul>
);
}