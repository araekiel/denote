import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import { Note } from './../types/main.interfaces.ts';

export let notes: Array<Note> = [];

// @desc Get all notes
// @route /api/notes/:type
const getNotes = ({ params, request, response }: { params: { type: string }, request: any, response: any }) => {
    if(params.type === "my") {
        const userNotes = notes.filter(n => n.userid === request.headers.get("user-id"));
        if(userNotes.length) {
            response.status = 200;
            response.body = {
                message: "Success!",
                status: 200,
                data: userNotes
            };
        } else {
            response.status = 200;
            response.body = {
                message: "You have not created any notes yet.",
            }
        }
        
    } else {
        if(notes.length) {
            response.status = 200;
            response.body = {
                message: "Success!",
                status: 200,
                data: notes
            };
        } else {
            response.status = 200;
            response.body = {
                message: "No notes have been created.",
            }
        }
    }
};

// @desc Add a note
// @route /api/notes/add
const addNote = async ( { request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(request.hasBody) {
        const note: Note = await body.value;
        note.id = v4.generate();
        note.userid = request.headers.get("user-id");
        notes.push(note);
        response.status = 201;
        response.body = {
            message: "Note has been added!",
            status: 201,
            data: note
        };
    } else {
        response.status = 400;
        response.body = {
            message: "Enter some data.",
            status: 400
       };
    }
}

// @desc Get a particular Note
// @route /api/notes/:id
const getNote = ({ params, response }: { params: { id: string }, response: any }) => {
    const note: Note | undefined = notes.find(n => n.id === params.id);

    if(note) {
        response.status = 200;
        response.body = {
            message: "Success!",
            status: 200,
            data: note
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Note does not exist.",
            status: 404
        }
    }
}

// @desc Update a note
// @route /api/notes/:id/update
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
                message: "Note updated!",
                status: 200,
                data: newNote
            };
        } else {
            response.status = 400;
            response.body = {
                message: "Enter some data.",
                status: 400
            } 
        }
    } else {
        response.status = 400;
        response.body = {
            message: "Note does not exist.",
            status: 200,
        };
    }
}


// @desc Delete a Note
// @route /api/notes/delete/:id
const deleteNote = ({ params, response }: { params: { id: string }, response: any}) => {
    const note: Note | undefined = notes.find(n => n.id === params.id);
    
    if(note) {
        notes = notes.filter(n => n.id != params.id);

        response.status = 200;
        response.body = {
            message: "Note removed!",
            status: 200,
            data: note
        };
    } else {
        response.status = 404;
        response.body = {
            message: "Note does not exist.",
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