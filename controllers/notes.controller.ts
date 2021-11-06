import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { Note } from './../types/main.interfaces.ts';

export let notes: Array<Note> = [];

// @desc Get all the notes created by each user in the current session.
// @route GET /api/notes
const getNotes = ({  response }: { response: any }) => {
    if(notes.length) {
        response.status = 200;
        response.body = {
            message: "Success: Notes found!",
            data: notes,
            status: 200
        };
    } else {
        response.status = 200;
        response.body = {
            message: "No note has been created.",
        }
    }
};

// @desc Add a note.
// @route POST /api/notes
const addNote = async ( { request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(request.hasBody) {
        const note: Note = await body.value;
        note.id = `note-${v4.generate()}`;
        note.userid = request.headers.get("user-id");
        notes.push(note);
        response.status = 201;
        response.body = {
            message: "Success: Note Added!",
            data: note,
            status: 201
        };
    } else {
        response.status = 400;
        response.body = {
            message: "Error: Enter some data.",
            status: 400
       };
    }
}

// @desc Get a particular note with its id.
// @route GET /api/notes/:id
const getNote = ({ params, response }: { params: { id: string }, response: any }) => {
    const note: Note | undefined = notes.find(n => n.id === params.id);

    if(note) {
        response.status = 200;
        response.body = {
            message: "Success: Note found!",
            data: note,
            status: 200
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Error: Note does not exist.",
            status: 404
        }
    }
}

// @desc Update a particular note with its id.
// @route PUT /api/notes/:id
const updateNote = async ({ params, request, response }: { params: { id: string }, request: any, response: any}) => {
    const note: Note | undefined = notes.find(n => n.id === params.id);

    if (note) {
        if(request.hasBody) {
            const body = await request.body();

            const noteUpdate: { title?: string, description?: string} = await body.value;

            notes = notes.map(n => n.id === params.id ? { ...n, ...noteUpdate } : n);
            const newNote: Note | undefined = notes.find(n => n.id === params.id);

            response.status = 200;
            response.body = {
                message: "Success: Note updated!",
                status: 200,
                data: newNote
            };
        } else {
            response.status = 400;
            response.body = {
                message: "Error: Enter some data.",
                status: 400
            } 
        }
    } else {
        response.status = 404;
        response.body = {
            message: "Error: Note does not exist.",
            status: 404
        };
    }
}


// @desc Delete a Note.
// @route DELETE /api/notes/:id
const deleteNote = ({ params, response }: { params: { id: string }, response: any}) => {
    const note: Note | undefined = notes.find(n => n.id === params.id);
    
    if(note) {
        notes = notes.filter(n => n.id != params.id);

        response.status = 200;
        response.body = {
            message: "Success: Note Deleted!",
            data: note,
            status: 200
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Error: Note does not exist.",
            status: 404
        };
    }
}

export const notesController = {
    getNotes,
    addNote,
    getNote,
    updateNote,
    deleteNote
};