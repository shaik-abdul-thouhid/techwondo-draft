import React from 'react';

export const Delete = (
    showsList: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[],
    setShowsList: React.Dispatch<React.SetStateAction<{
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[]>>,
    indexOfShowToDelete: number
) => {
    let temp: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[] = [];
    for (let i = 0; i < showsList.length; i++) {
        if (i === indexOfShowToDelete) continue;
        else {
            temp.push(showsList[i]);
        }
    }
    setShowsList(temp);
}

export const AddShow = (
    showsList: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[],
    setShowsList: React.Dispatch<React.SetStateAction<{
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[]>>,
    addShow: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }
) => {
    setShowsList([...showsList, addShow]);
}

export const UpdateShow = (
    showsList: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[],
    setShowsList: React.Dispatch<React.SetStateAction<{
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[]>>,
    updateShow: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    },
    indexToUpdateShow: number
) => {
    let temp: {
        title: string;
        streamingApp: string;
        rating: string;
        review: string;
    }[] = [];
    for (let i = 0; i < showsList.length; i++) {
        if (i === indexToUpdateShow) {
            temp.push(updateShow);
        } else {
            temp.push(showsList[i]);
        }
    }
    setShowsList(temp);
}
