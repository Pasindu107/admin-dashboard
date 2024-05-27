// pages/details/[id].js
import React from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const { id, field, value } = context.query;
    return {
        props: { id, field, value }
    };
}

const Details = ({ id, field, value }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Details for ID: {id}</h1>
            <p>{field}: {value}</p>
        </div>
    );
};

export default Details;