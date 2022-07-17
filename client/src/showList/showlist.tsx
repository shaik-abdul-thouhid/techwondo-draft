import { Fragment, useState, useEffect } from 'react';
import { Delete, AddShow, UpdateShow } from './operations';
import axios, { AxiosResponse } from 'axios';

function ListItem(props: {
    li: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    },
    index: number,
    setOperation: React.Dispatch<React.SetStateAction<{
        op: string;
        show?: {
            title: string;
            streamingApp: string;
            rating: string;
            review: string;
        } | undefined;
        index?: number | undefined;
    } | null>>
}) {

    const
        [streamingApp, setStreamingApp] = useState<string>(props.li.streamingApp),
        [rating, setRating] = useState<string>(props.li.rating),
        [review, setReview] = useState<string>(props.li.review),
        update = () => {
            props.setOperation({ op: 'update', show: {
                title: props.li.title,
                streamingApp: streamingApp,
                rating: rating,
                review: review
            }, index: props.index });
        }

    return (
        <>
            <h3>{ props.li.title }</h3>
            <label>Streaming App</label>
            <input value={ streamingApp } onChange={ e => setStreamingApp(e.target.value) } />
            <label>Ratings</label>
            <input value={ rating } onChange={ e => setRating(e.target.value) } />
            <label>Reviews</label>
            <input value={ review } onChange={ e => setReview(e.target.value) } />
            <button onClick={ update }>Update</button>
            <button onClick={ () => { props.setOperation({ op: 'delete', index: props.index }) } }>Delete</button>
        </>
    );
}

export default function ShowList(props: {
    showsList: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[],
    setAuthToken: React.Dispatch<React.SetStateAction<string>>,
    authToken: string,
    setShowsList: React.Dispatch<React.SetStateAction<{
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[]>>
}) {
    console.log(props.showsList);

    const
        [title, setTitle] = useState<string>(''),
        [streamingApp, setStreamingApp] = useState<string>(''),
        [rating, setRating] = useState<string>(''),
        [review, setReview] = useState<string>(''),
        [operation, setOperation] = useState<null | { op: string, show?: {
                                                                    title: string,
                                                                    streamingApp: string,
                                                                    rating: string,
                                                                    review: string
                                                                }, index?: number }>(null),
        addShow = () => {
            if (title !== '' && streamingApp !== '' && rating !== '' && review !== '') {
                setOperation({
                    op: 'add',
                    show: {
                        title: title,
                        streamingApp: streamingApp,
                        rating: rating,
                        review: review
                    }
                })
            }
        };

    useEffect(() => {

        const requestUpdate = async (showsList: {
            title: string;
            streamingApp: string;
            rating: string;
            review: string;
        }[]) => {
            axios.get('http://localhost:3001/update', {
                    headers: {
                        authorization: `BEARER ${ props.authToken }`
                    },
                    params : {
                        shows: props.showsList
                    }
                })
                .then((data: AxiosResponse) => {
                    console.log(data);
                })
                .catch(err => console.log(err.response.data));
        }

        if (operation !== null) {
            if (operation.op === 'delete' && operation.index !== undefined) {
                Delete(props.showsList, props.setShowsList, operation.index);
                requestUpdate(props.showsList);
                setOperation(null);
            }
            else if (operation.op === 'add' && operation.show !== undefined) {
                AddShow(props.showsList, props.setShowsList, operation.show);
                requestUpdate(props.showsList);
                setOperation(null);
            }
            else if (operation.op === 'update' && operation.show !== undefined && operation.index !== undefined) {
                UpdateShow(props.showsList, props.setShowsList, operation.show, operation.index);
                requestUpdate(props.showsList);
                setOperation(null);
            }
        }
    }, [operation, props]);

    return (
        <Fragment>
            <button onClick={ () => props.setAuthToken('') }>Logout</button>
            { (props.showsList === []) ?  
                'Empty' : 
                <>
                    <ul>
                        {
                            props.showsList.map((li, i) => <ListItem key={ i } setOperation={ setOperation } index={ i } li={ li } />)
                        }
                    </ul>
                    <h3>Add Show</h3>

                    <form>
                        <input type='text' value={ title } onChange={ e => setTitle(e.target.value)} />
                        <input type='text' value={ streamingApp } onChange={ e => setStreamingApp(e.target.value)} />
                        <input type='text' value={ rating } onChange={ e => setRating(e.target.value)} />
                        <input type='text' value={ review } onChange={ e => setReview(e.target.value)} />
                        <button onClick={ addShow }>Add Show</button>
                    </form>
                </>

            }
        </Fragment>
    );
}